# VK_KHR_device_group(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_device_group.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_device_group](#VK_KHR_device_group)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-in Variables](#_new_built_in_variables)
- [New_Built-in_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_device_group - device extension

**Name String**

`VK_KHR_device_group`

**Extension Type**

Device extension

**Registered Extension Number**

61

**Revision**

4

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html)

**API Interactions**

* 
Interacts with VK_KHR_bind_memory2

* 
Interacts with VK_KHR_surface

* 
Interacts with VK_KHR_swapchain

**SPIR-V Dependencies**

* 
[SPV_KHR_device_group](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_device_group.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_device_group] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_device_group extension*)

**Last Modified Date**

2017-10-10

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Tobias Hector, Imagination Technologies

This extension provides functionality to use a logical device that consists
of multiple physical devices, as created with the
`[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html)` extension.
A device group can allocate memory across the subdevices, bind memory from
one subdevice to a resource on another subdevice, record command buffers
where some work executes on an arbitrary subset of the subdevices, and
potentially present a swapchain image from one or more subdevices.

The following enums, types, and commands are included as interactions with
`[VK_KHR_swapchain](VK_KHR_swapchain.html)`:

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_SWAPCHAIN_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACQUIRE_NEXT_IMAGE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)

* 
[VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html)

* 
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)

* 
[VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html)

* 
[VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html)

* 
[VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html)

* 
[VkDeviceGroupPresentInfoKHR](VkDeviceGroupPresentInfoKHR.html)

* 
[VkDeviceGroupSwapchainCreateInfoKHR](VkDeviceGroupSwapchainCreateInfoKHR.html)

* 
[vkGetDeviceGroupPresentCapabilitiesKHR](vkGetDeviceGroupPresentCapabilitiesKHR.html)

* 
[vkGetDeviceGroupSurfacePresentModesKHR](vkGetDeviceGroupSurfacePresentModesKHR.html)

* 
[vkGetPhysicalDevicePresentRectanglesKHR](vkGetPhysicalDevicePresentRectanglesKHR.html)

* 
[vkAcquireNextImage2KHR](vkAcquireNextImage2KHR.html)

If Vulkan 1.1 and `[VK_KHR_swapchain](VK_KHR_swapchain.html)` are supported, these are
included by `[VK_KHR_swapchain](VK_KHR_swapchain.html)`.

The base functionality in this extension is included in core Vulkan 1.1,
with the KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkCmdDispatchBaseKHR](vkCmdDispatchBase.html)

* 
[vkCmdSetDeviceMaskKHR](vkCmdSetDeviceMask.html)

* 
[vkGetDeviceGroupPeerMemoryFeaturesKHR](vkGetDeviceGroupPeerMemoryFeatures.html)

If [VK_KHR_surface](VK_KHR_surface.html) is supported:

* 
[vkGetDeviceGroupPresentCapabilitiesKHR](vkGetDeviceGroupPresentCapabilitiesKHR.html)

* 
[vkGetDeviceGroupSurfacePresentModesKHR](vkGetDeviceGroupSurfacePresentModesKHR.html)

* 
[vkGetPhysicalDevicePresentRectanglesKHR](vkGetPhysicalDevicePresentRectanglesKHR.html)

If [VK_KHR_swapchain](VK_KHR_swapchain.html) is supported:

* 
[vkAcquireNextImage2KHR](vkAcquireNextImage2KHR.html)

* 
Extending [VkBindSparseInfo](VkBindSparseInfo.html):

[VkDeviceGroupBindSparseInfoKHR](VkDeviceGroupBindSparseInfo.html)

Extending [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html):

* 
[VkDeviceGroupCommandBufferBeginInfoKHR](VkDeviceGroupCommandBufferBeginInfo.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkMemoryAllocateFlagsInfoKHR](VkMemoryAllocateFlagsInfo.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkRenderingInfo](VkRenderingInfo.html):

* 
[VkDeviceGroupRenderPassBeginInfoKHR](VkDeviceGroupRenderPassBeginInfo.html)

Extending [VkSubmitInfo](VkSubmitInfo.html):

* 
[VkDeviceGroupSubmitInfoKHR](VkDeviceGroupSubmitInfo.html)

If [VK_KHR_bind_memory2](VK_KHR_bind_memory2.html) is supported:

* 
Extending [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html):

[VkBindBufferMemoryDeviceGroupInfoKHR](VkBindBufferMemoryDeviceGroupInfo.html)

Extending [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html):

* 
[VkBindImageMemoryDeviceGroupInfoKHR](VkBindImageMemoryDeviceGroupInfo.html)

If [VK_KHR_surface](VK_KHR_surface.html) is supported:

* 
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)

If [VK_KHR_swapchain](VK_KHR_swapchain.html) is supported:

* 
[VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html)

* 
Extending [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html):

[VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html)

Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

* 
[VkDeviceGroupPresentInfoKHR](VkDeviceGroupPresentInfoKHR.html)

Extending [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

* 
[VkDeviceGroupSwapchainCreateInfoKHR](VkDeviceGroupSwapchainCreateInfoKHR.html)

* 
[VkMemoryAllocateFlagBitsKHR](VkMemoryAllocateFlagBits.html)

* 
[VkPeerMemoryFeatureFlagBitsKHR](VkPeerMemoryFeatureFlagBits.html)

If [VK_KHR_surface](VK_KHR_surface.html) is supported:

* 
[VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html)

* 
[VkMemoryAllocateFlagsKHR](VkMemoryAllocateFlags.html)

* 
[VkPeerMemoryFeatureFlagsKHR](VkPeerMemoryFeatureFlags.html)

If [VK_KHR_surface](VK_KHR_surface.html) is supported:

* 
[VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html)

* 
`VK_KHR_DEVICE_GROUP_EXTENSION_NAME`

* 
`VK_KHR_DEVICE_GROUP_SPEC_VERSION`

* 
Extending [VkDependencyFlagBits](VkDependencyFlagBits.html):

[VK_DEPENDENCY_DEVICE_GROUP_BIT_KHR](VkDependencyFlagBits.html)

Extending [VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html):

* 
[VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT_KHR](VkMemoryAllocateFlagBits.html)

Extending [VkPeerMemoryFeatureFlagBits](VkPeerMemoryFeatureFlagBits.html):

* 
[VK_PEER_MEMORY_FEATURE_COPY_DST_BIT_KHR](VkPeerMemoryFeatureFlagBits.html)

* 
[VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT_KHR](VkPeerMemoryFeatureFlagBits.html)

* 
[VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT_KHR](VkPeerMemoryFeatureFlagBits.html)

* 
[VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT_KHR](VkPeerMemoryFeatureFlagBits.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT_KHR](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO_KHR](VkStructureType.html)

If [VK_KHR_bind_memory2](VK_KHR_bind_memory2.html) is supported:

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO_KHR](VkStructureType.html)

If [VK_KHR_surface](VK_KHR_surface.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_CAPABILITIES_KHR](VkStructureType.html)

If [VK_KHR_swapchain](VK_KHR_swapchain.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ACQUIRE_NEXT_IMAGE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_SWAPCHAIN_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

Extending [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html):

* 
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)

* 
[`DeviceIndex`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-deviceindex)

* 
[`DeviceGroup`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DeviceGroup)

* 
Revision 1, 2016-10-19 (Jeff Bolz)

Internal revisions

Revision 2, 2017-05-19 (Tobias Hector)

* 
Removed extended memory bind functions to VK_KHR_bind_memory2, added
dependency on that extension, and device-group-specific structs for
those functions.

Revision 3, 2017-10-06 (Ian Elliott)

* 
Corrected Vulkan 1.1 interactions with the WSI extensions.
All Vulkan 1.1 WSI interactions are with the VK_KHR_swapchain
extension.

Revision 4, 2017-10-10 (Jeff Bolz)

* 
Rename “SFR” bits and structure members to use the phrase “split
instance bind regions”.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_device_group).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
