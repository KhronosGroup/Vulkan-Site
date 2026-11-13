# Debugging with Synchronization Validation: Finding Your Hazards

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Synchronization_Validation/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The Hazards We Face](#_the_hazards_we_face)
- [The_Hazards_We_Face](#_the_hazards_we_face)
- [What We’ll Explore](#_what_well_explore)
- [What_We’ll_Explore](#_what_well_explore)
- [Navigation](#_navigation)

## Content

Vulkan synchronization is a "trust but verify" system. You can write what you believe is perfectly correct `vk::DependencyInfo` and `vk::SubmitInfo2` code, but the only way to be absolutely certain is to test it against the actual hardware behavior. However, synchronization bugs are notoriously difficult to find. They often manifest as subtle flickering, occasional crashes, or—worst of all—perfect behavior on your development machine and complete failure on a customer’s GPU.

This is where the **LunarG Synchronization Validation** layer comes in. It is, without a doubt, the most important tool in your Vulkan debugging arsenal. Unlike the standard validation layers that check for API usage errors, the sync validation layer tracks the state of every resource in your engine and identifies the "Read-After-Write" (RAW), "Write-After-Read" (WAR), and "Write-After-Write" (WAW) hazards that lead to data corruption.

Synchronization is essentially about managing these three types of hazards:

**Read-After-Write (RAW)**: A stage tries to read a resource before a previous stage has finished writing to it. This is the most common cause of "garbage" data.

**Write-After-Read (WAR)**: A stage tries to write to a resource while a previous stage is still reading from it. This can lead to the previous stage reading "half-updated" data.

**Write-After-Write (WAW)**: Two stages try to write to the same resource simultaneously. The result is unpredictable and almost always leads to corruption.

In this chapter, we’ll learn how to leverage the validation layers to make our engine perfectly robust. We’ll explore:

**The Validation Layer**: How to configure and enable the LunarG Synchronization Validation layer within your engine’s debug build.

**Interpreting VUIDs**: Vulkan Validation Unique Identifiers (VUIDs) can be daunting. We’ll learn how to decipher these complex error messages and turn them into actionable code fixes.

**Identifying Hazards**: We’ll see real-world examples of how the validation layer catches hazards that are nearly impossible to find through manual inspection.

By the end of this chapter, you’ll have the tools and the knowledge to ensure that your synchronization code is not just "mostly correct," but "Vulkan-validated" correct.

Previous: [Visibility & Flushes](../Host_Image_Copies_Memory_Sync/03_visibility_flushes.html) | Next: [The Validation Layer](02_validation_layer.html)
