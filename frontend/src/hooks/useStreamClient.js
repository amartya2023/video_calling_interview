import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import {
  initializeStreamClient,
  disconnectStreamClient,
} from "../lib/stream";

import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;
    let isMounted = true;

    const initCall = async () => {
      // Wait until session is loaded
      if (loadingSession) {
        return;
      }

      // Session doesn't exist
      if (!session) {
        setIsInitializingCall(false);
        return;
      }

      // User is not allowed to join
      if (!isHost && !isParticipant) {
        setIsInitializingCall(false);
        return;
      }

      // IMPORTANT:
      // We NEED callId to create/join the Stream call
      if (!session.callId) {
        console.error("Session does not have a callId");
        toast.error("Video call ID is missing");
        setIsInitializingCall(false);
        return;
      }

      try {
        console.log("Initializing Stream call...");
        console.log("Call ID:", session.callId);

        // ------------------------------------------------
        // 1. Get Stream token
        // ------------------------------------------------
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        console.log("Stream token received");

        // ------------------------------------------------
        // 2. Initialize Stream Video Client
        // ------------------------------------------------
        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!isMounted) return;

        setStreamClient(client);

        console.log("Stream client initialized");

        // ------------------------------------------------
        // 3. Create/Get Stream Call
        // ------------------------------------------------
        videoCall = client.call("default", session.callId);

        // ------------------------------------------------
        // 4. Join Call
        // ------------------------------------------------
        await videoCall.join({
          create: true,
        });

        console.log("Joined Stream call successfully");

        // ------------------------------------------------
        // 5. Enable Camera
        // ------------------------------------------------
        await videoCall.camera.enable();

        console.log("Camera enabled");

        // ------------------------------------------------
        // 6. Enable Microphone
        // ------------------------------------------------
        await videoCall.microphone.enable();

        console.log("Microphone enabled");

        if (!isMounted) return;

        setCall(videoCall);

        // ------------------------------------------------
        // 7. Initialize Stream Chat
        // ------------------------------------------------
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;

        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        console.log("Stream Chat connected");

        if (!isMounted) return;

        setChatClient(chatClientInstance);

        // ------------------------------------------------
        // 8. Create Chat Channel
        // ------------------------------------------------
        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId
        );

        await chatChannel.watch();

        console.log("Chat channel connected");

        if (!isMounted) return;

        setChannel(chatChannel);

        console.log("Video call initialization complete!");
      } catch (error) {
        console.error("Error initializing video call:", error);

        toast.error(
          error?.message || "Failed to join video call"
        );
      } finally {
        if (isMounted) {
          setIsInitializingCall(false);
        }
      }
    };

    initCall();

    // ------------------------------------------------
    // Cleanup
    // ------------------------------------------------
    return () => {
      isMounted = false;

      (async () => {
        try {
          if (videoCall) {
            await videoCall.leave();
          }

          if (chatClientInstance) {
            await chatClientInstance.disconnectUser();
          }

          await disconnectStreamClient();

          console.log("Stream call cleaned up");
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;