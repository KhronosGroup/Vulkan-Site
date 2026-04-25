# vkCmdBuildMicromapsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBuildMicromapsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBuildMicromapsEXT - Build a micromap

To build micromaps call:

// Provided by VK_EXT_opacity_micromap
void vkCmdBuildMicromapsEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    infoCount,
    const VkMicromapBuildInfoEXT*               pInfos);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`infoCount` is the number of micromaps to build.
It specifies the number of the `pInfos` structures that **must** be
provided.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structures defining the data used to build
each micromap.

The `vkCmdBuildMicromapsEXT` command provides the ability to initiate
multiple micromaps builds, however there is no ordering or synchronization
implied between any of the individual micromap builds.

|  | This means that there **cannot** be any memory aliasing between any micromap
| --- | --- |
memories or scratch memories being used by any of the builds. |

Accesses to the micromap scratch buffers as identified by the
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)::`scratchData` buffer device addresses
**must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
([VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html) |
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html)).
Accesses to [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)::`dstMicromap` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html).

Accesses to other input buffers as identified by any used values of
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)::`data` or
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)::`triangleArray` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_SHADER_READ_BIT](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07461) VUID-vkCmdBuildMicromapsEXT-pInfos-07461

For each `pInfos`[i], `dstMicromap` **must** have been created with
a value of [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`size` greater than or
equal to the memory size required by the build operation, as returned by
[vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html) with `pBuildInfo` =
`pInfos`[i]

* 
[](#VUID-vkCmdBuildMicromapsEXT-mode-07462) VUID-vkCmdBuildMicromapsEXT-mode-07462

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildMicromapModeEXT](VkBuildMicromapModeEXT.html) value

* 
[](#VUID-vkCmdBuildMicromapsEXT-dstMicromap-07463) VUID-vkCmdBuildMicromapsEXT-dstMicromap-07463

The `dstMicromap` member of any element of `pInfos` **must** be a
valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07464) VUID-vkCmdBuildMicromapsEXT-pInfos-07464

For each element of `pInfos` its `type` member **must** match the
value of [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`type` when its
`dstMicromap` was created

* 
[](#VUID-vkCmdBuildMicromapsEXT-dstMicromap-07465) VUID-vkCmdBuildMicromapsEXT-dstMicromap-07465

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `dstMicromap` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildMicromapsEXT-dstMicromap-07466) VUID-vkCmdBuildMicromapsEXT-dstMicromap-07466

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any element of
`pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkCmdBuildMicromapsEXT-scratchData-07467) VUID-vkCmdBuildMicromapsEXT-scratchData-07467

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07508) VUID-vkCmdBuildMicromapsEXT-pInfos-07508

For each element of `pInfos`, the `buffer` used to create its
`dstMicromap` member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07509) VUID-vkCmdBuildMicromapsEXT-pInfos-07509

If `pInfos`[i].`mode` is [VK_BUILD_MICROMAP_MODE_BUILD_EXT](VkBuildMicromapModeEXT.html),
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `buildScratchSize` member of the
[VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html) structure returned from a call to
[vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html) with an identical
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structure and primitive count

* 
[](#VUID-vkCmdBuildMicromapsEXT-data-07510) VUID-vkCmdBuildMicromapsEXT-data-07510

The buffers from which the buffer device addresses for all of the
`data` and `triangleArray` members of all `pInfos`[i] are
queried **must** have been created with the
[VK_BUFFER_USAGE_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT](VkBufferUsageFlagBits.html) usage flag
set

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07511) VUID-vkCmdBuildMicromapsEXT-pInfos-07511

For each element of `pInfos`[i] the buffer from which the buffer
device address `pInfos`[i].`scratchData.deviceAddress` is
queried **must** have been created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07512) VUID-vkCmdBuildMicromapsEXT-pInfos-07512

For each element of `pInfos`, if the value of
[VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html)::`buildScratchSize`, returned from
a call to [vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html) with an identical
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structure, is not `0`,
`scratchData.deviceAddress` **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-10896) VUID-vkCmdBuildMicromapsEXT-pInfos-10896

For each element of `pInfos`, `data.deviceAddress` **must** be a
valid `VkDeviceAddress`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-10897) VUID-vkCmdBuildMicromapsEXT-pInfos-10897

For each element of `pInfos`, `triangleArray.deviceAddress`
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07514) VUID-vkCmdBuildMicromapsEXT-pInfos-07514

For each element of `pInfos`, its `scratchData.deviceAddress`
member **must** be a multiple of
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`minAccelerationStructureScratchOffsetAlignment`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07515) VUID-vkCmdBuildMicromapsEXT-pInfos-07515

For each element of `pInfos`, its `triangleArray.deviceAddress`
and `data.deviceAddress` members **must** be a multiple of `256`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildMicromapsEXT-commandBuffer-parameter) VUID-vkCmdBuildMicromapsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-parameter) VUID-vkCmdBuildMicromapsEXT-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structures

* 
[](#VUID-vkCmdBuildMicromapsEXT-commandBuffer-recording) VUID-vkCmdBuildMicromapsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildMicromapsEXT-commandBuffer-cmdpool) VUID-vkCmdBuildMicromapsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBuildMicromapsEXT-renderpass) VUID-vkCmdBuildMicromapsEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildMicromapsEXT-suspended) VUID-vkCmdBuildMicromapsEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildMicromapsEXT-videocoding) VUID-vkCmdBuildMicromapsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBuildMicromapsEXT-infoCount-arraylength) VUID-vkCmdBuildMicromapsEXT-infoCount-arraylength

 `infoCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildMicromapsEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCmdBuildMicromapsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
