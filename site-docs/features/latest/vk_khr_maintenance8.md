# VK_KHR_maintenance8

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_maintenance8.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [2.1. Support Offset (as an alternative to ConstOffset) image operand in texture sampling and fetch operations](#_support_offset_as_an_alternative_to_constoffset_image_operand_in_texture_sampling_and_fetch_operations)
- [2.1._Support_Offset_(as_an_alternative_to_ConstOffset)_image_operand_in_texture_sampling_and_fetch_operations](#_support_offset_as_an_alternative_to_constoffset_image_operand_in_texture_sampling_and_fetch_operations)
- [2.2. Allow copies between depth/stencil and “matching” color attachments](#_allow_copies_between_depthstencil_and_matching_color_attachments)
- [2.2._Allow_copies_between_depth/stencil_and_“matching”_color_attachments](#_allow_copies_between_depthstencil_and_matching_color_attachments)
- [2.3. Explicit Synchronization in vkMergePipelineCaches](#_explicit_synchronization_in_vkmergepipelinecaches)
- [2.3._Explicit_Synchronization_in_vkMergePipelineCaches](#_explicit_synchronization_in_vkmergepipelinecaches)
- [2.4. Meaningful Stages for Queue Family Ownership Transfers](#_meaningful_stages_for_queue_family_ownership_transfers)
- [2.4._Meaningful_Stages_for_Queue_Family_Ownership_Transfers](#_meaningful_stages_for_queue_family_ownership_transfers)
- [3. Example](#_example)
- [4. Issues](#_issues)
- [4.1. Does the new VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR flag work with the original synchronization commands?](#_does_the_new_vk_dependency_queue_family_ownership_transfer_use_all_stages_bit_khr_flag_work_with_the_original_synchronization_commands)
- [4.1._Does_the_new_VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR_flag_work_with_the_original_synchronization_commands?](#_does_the_new_vk_dependency_queue_family_ownership_transfer_use_all_stages_bit_khr_flag_work_with_the_original_synchronization_commands)
- [4.2. When doing queue family ownership transfers, do the specified stages need to match between the source and destination queues?](#_when_doing_queue_family_ownership_transfers_do_the_specified_stages_need_to_match_between_the_source_and_destination_queues)
- [4.2._When_doing_queue_family_ownership_transfers,_do_the_specified_stages_need_to_match_between_the_source_and_destination_queues?](#_when_doing_queue_family_ownership_transfers_do_the_specified_stages_need_to_match_between_the_source_and_destination_queues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)

[2.1. Support `Offset` (as an alternative to `ConstOffset`) image operand in texture sampling and fetch operations](#_support_offset_as_an_alternative_to_constoffset_image_operand_in_texture_sampling_and_fetch_operations)
[2.2. Allow copies between depth/stencil and “matching” color attachments](#_allow_copies_between_depthstencil_and_matching_color_attachments)
[2.3. Explicit Synchronization in `vkMergePipelineCaches`](#_explicit_synchronization_in_vkmergepipelinecaches)
[2.4. Meaningful Stages for Queue Family Ownership Transfers](#_meaningful_stages_for_queue_family_ownership_transfers)

[3. Example](#_example)
[4. Issues](#_issues)

[4.1. Does the new VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR flag work with the original synchronization commands?](#_does_the_new_vk_dependency_queue_family_ownership_transfer_use_all_stages_bit_khr_flag_work_with_the_original_synchronization_commands)
[4.2. When doing queue family ownership transfers, do the specified stages need to match between the source and destination queues?](#_when_doing_queue_family_ownership_transfers_do_the_specified_stages_need_to_match_between_the_source_and_destination_queues)

This proposal details and addresses the issues solved by the `VK_KHR_maintenance8` extension.

Over time, a collection of minor features, none of which would warrant an
entire extension of their own, requires the creation of a maintenance
extension.

The following is a list of issues considered in this proposal:

* 
Allow copies between depth/stencil and “matching” color attachments

* 
Allow `dstCache` in `vkMergePipelineCaches` to be implicitly synchronized.

* 
Require src/dst sync scopes to work when doing queue family ownership
transfers

* 
Support `Offset` (as an alternative to `ConstOffset`) image operand
in texture sampling and fetch operations

* 
Use the SPIR-V definition of OpSRem and OpSMod, making these
operations produce well-defined results for negative operands

* 
Loosen layer restrictions when blitting from 3D images to other image types

* 
Add space for an additional 64 access flags for use with VkMemoryBarrier2,
VkBufferMemoryBarrier2, and VkImageMemoryBarrier2

Items introduced by this extension are:

`ConstOffset` only allows only constant offsets. Prior to maintenance8
`Offset` is only supported for gather operations. This is an issue
for D3D12 layering.

D3D12 allows transfer copies between e.g., R32F and D32F. Providing this functionality
improves layered D3D12 implementations.

The `vkMergePipelineCaches` function requires that its `dstCache` parameter is externally synchronized.
Currently, applications which can potentially call `vkMergePipelineCaches` simultaneously from different threads must implement locking around `vkCreate*Pipelines` for the pipeline cache even if it is created without VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT.
This can be detrimental to performance, especially if `vkMergePipelineCaches` rarely happens.

The new `VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR` flag can be used when creating a pipeline cache to indicate that, when used as the `dstCache` parameter of `vkMergePipelineCaches`, external synchronization is not needed with pipeline creation functions.
This flag is mutually exclusive with `VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT`.

This extension adds a new dependency flag indicating that both stage masks
are now meaningful when performing a queue family ownership transfer:

    VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR = 0xTBD,

When `VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR` is included in [VkDependencyFlags](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkDependencyFlags), buffer and image memory barriers that specify queue family ownership transfers will make use of both synchronization scopes.

Without this new flag, the operations on each queue can only be synchronized by using `VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT`, which can cause a full stall of the device on many implementations.
When this flag is specified, these operations can instead be synchronized using the stage flags just as any other synchronization operation would be.

Keeping the destination stage equal to the source stage will generally minimize over synchronization and is recommended, but there is no need for them to match.
Similarly, there is no need for the stage masks in either queue to match.

The following code performs a queue family ownership transfer for a color attachment from a graphics queue to a compute queue as a storage image:

Graphics Queue Release Operation

VkImageMemoryBarrier2 imageMemoryBarrier = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2,
    .srcStageMask = VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
    .dstStageMask = VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
    .srcAccessMask = VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT,
    .oldLayout = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
    .newLayout = VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
    .srcQueueFamilyIndex = graphicsQueueFamilyIndex,
    .dstQueueFamilyIndex = computeQueueFamilyIndex,
    .image = ...,
    .subresourceRange = ...};

VkDependencyInfo dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO,
    .dependencyFlags = VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR,
    .imageMemoryBarrierCount = 1,
    .imageMemoryBarrier = &imageMemoryBarrier,
}

vkCmdPipelineBarrier2(graphicsCommandBuffer, &dependencyInfo);

Graphics Queue Submit Information

VkSemaphoreSubmitInfo semaphoreSignalInfo = {
    .sType = VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO,
    .semaphore = transferSemaphore,
    .stageMask = VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT }; // Do not signal the semaphore until color attachment output completes

VkCommandBufferSubmitInfo graphicsCommandBufferInfo = {
    .sType = VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO,
    .commandBuffer = graphicsCommandBuffer };

VkSubmitInfo2 submitInfo = {
    .sType = VK_STRUCTURE_TYPE_SUBMIT_INFO_2,
    .commandBufferInfoCount = 1,
    .pCommandBufferInfos = &graphicsCommandBufferInfo,
    .signalSemaphoreInfoCount = 1,
    .pSignalSemaphoreInfos = &semaphoreSignalInfo,

vkQueueSubmit2(graphicsQueue, 1, &submitInfo, VK_NULL_HANDLE);

Compute Queue Acquire Operation

VkImageMemoryBarrier2 imageMemoryBarrier = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2,
    .srcStageMask = VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT,
    .dstStageMask = VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT,
    .dstAccessMask = VK_ACCESS_2_SHADER_READ_BIT,
    .oldLayout = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
    .newLayout = VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
    .srcQueueFamilyIndex = graphicsQueueFamilyIndex,
    .dstQueueFamilyIndex = computeQueueFamilyIndex,
    .image = ...,
    .subresourceRange = ...};

VkDependencyInfo dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO,
    .dependencyFlags = VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR,
    .imageMemoryBarrierCount = 1,
    .imageMemoryBarrier = &imageMemoryBarrier,
}

vkCmdPipelineBarrier2(computeCommandBuffer, &dependencyInfo);

Compute Queue Submit Information

VkSemaphoreSubmitInfo semaphoreWaitInfo = {
    .sType = VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO,
    .semaphore = transferSemaphore,
    .stageMask = VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT };  // Do not execute compute shader stages in the destination until semaphore is signaled.

VkCommandBufferSubmitInfo computeCommandBufferInfo = {
    .sType = VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO,
    .commandBuffer = computeCommandBuffer };

VkSubmitInfo2 submitInfo = {
    .sType = VK_STRUCTURE_TYPE_SUBMIT_INFO_2,
    .waitSemaphoreInfoCount = 1,
    .pWaitSemaphoreInfos = &semaphoreWaitInfo,
    .commandBufferInfoCount = 1,
    .pCommandBufferInfos = &computeCommandBufferInfo,

vkQueueSubmit2(graphicsQueue, 1, &submitInfo, VK_NULL_HANDLE);

It will work specifically with `vkCmdPipelineBarrier` as this has a dependency flags parameter.
When used with this command, the synchronization scopes are used for synchronizing in the same manner when a QFOT is specified.

There is no requirement that any stage masks need to match between the acquire and release, whether the new `VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR` flag is present or not.
