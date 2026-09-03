# Interpreting VUIDs: Deciphering Your Hazard Errors

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Synchronization_Validation/03_interpreting_vuids.html

## Table of Contents

- [The Anatomy of a VUID](#_the_anatomy_of_a_vuid)
- [The_Anatomy_of_a_VUID](#_the_anatomy_of_a_vuid)
- [Deciphering the Message](#_deciphering_the_message)
- [Deciphering_the_Message](#_deciphering_the_message)
- [Actionable Fixes](#_actionable_fixes)
- [Navigation](#_navigation)

## Content

Vulkan **Validation Unique Identifiers (VUIDs)** are the specific error codes that the validation layers emit when they find a problem. These IDs, like `VUID-VkImageMemoryBarrier2-image-01199`, are not just random numbers. They correspond to specific rules in the Vulkan specification.

When the sync validation layer finds a hazard, it will emit an error message that looks something like this:

VALIDATION [SYNC-HAZARD-READ-AFTER-WRITE] (0x01234567)
VUID: VUID-vkCmdDraw-None-07892
Message: Write-After-Read (WAR) hazard on Image (0x89abcdef) in VkCommandBuffer (0x12345678).
    - Current Stage: VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT
    - Current Access: VK_ACCESS_2_SHADER_READ_BIT
    - Previous Stage: VK_PIPELINE_STAGE_2_COPY_BIT
    - Previous Access: VK_ACCESS_2_TRANSFER_WRITE_BIT

To a new developer, this message can be overwhelming. But if you break it down, it’s actually telling you exactly what’s wrong:

**Hazard Type**: The `[SYNC-HAZARD-READ-AFTER-WRITE]` tag tells you the nature of the problem. In this case, a read is happening before a previous write has finished.

**Resource**: The message identifies the specific resource (`Image (0x89abcdef)`) and the command buffer where the hazard occurred.

**The Culprits**: The message lists the "Current" and "Previous" stages and access masks. In this example, the fragment shader is trying to read an image that was just being updated by a copy operation.

Once you understand what the message is telling you, the fix is usually straightforward:

* 
**Add a Barrier**: If a previous stage is still writing when the current stage starts reading, you need to add a `vk::ImageMemoryBarrier2` (or a `vk::MemoryBarrier2`) between the two stages to ensure that the write is finished and visible.

* 
**Refine Your Stages**: If you already have a barrier, check that your `srcStageMask` and `dstStageMask` are correct. Did you wait for the correct stage? Did you use the correct access mask?

* 
**Check Your Submission**: If the hazard occurs between two different submissions, are you using a semaphore or a fence to coordinate them?

By treating every VUID as a learning opportunity, you can systematically improve the quality and the performance of your synchronization code. In the final chapter, we’ll see how to optimize these patterns for maximum GPU throughput.

Previous: [The Validation Layer](02_validation_layer.html) | Next: [Profiling, Batching, and Optimization](../Profiling_Optimization/01_introduction.html)
