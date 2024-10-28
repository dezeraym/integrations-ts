import Restack, { ServiceInput } from "@restackio/ai"; // Assuming Restack is still relevant for your use case
import { rpmToSecond } from "@restackio/ai/utils"; // Utility for rate limiting
import { listScheduledEvents, createEventType } from "./functions"; // Import your specific functions
import { calendlyTaskQueue } from "./taskQueue"; // Task queue for Calendly


export async function calendlyService({
  client,
  options = {
    rateLimit: rpmToSecond(10000), // Example rate limit
  },
  taskQueueSuffix,
}: {
  client: Restack; // Assuming Restack is the type of your client
  options?: ServiceInput["options"]; // Options type from Restack
  taskQueueSuffix?: string; // Optional suffix for task queue
}) {
  await client.startService({
    taskQueue: `${calendlyTaskQueue}${taskQueueSuffix ?? ""}`, // Construct the task queue name
    functions: { listScheduledEvents, createEventType }, // Use your imported functions here
    options, // Pass options including rate limits
  });
}

// Optional: Call the service directly for testing
calendlyService({ client: new Restack() }).catch((err) => {
  console.error("Error in main:", err);
});


