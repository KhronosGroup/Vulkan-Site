# VK_KHR_dynamic_rendering_local_read(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_dynamic_rendering_local_read.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_dynamic_rendering_local_read](#VK_KHR_dynamic_rendering_local_read)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_dynamic_rendering_local_read - device extension

**Name String**

`VK_KHR_dynamic_rendering_local_read`

**Extension Type**

Device extension

**Registered Extension Number**

233

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_dynamic_rendering_local_read] @tobski%0A*Here describe the issue or question you have about the VK_KHR_dynamic_rendering_local_read extension*)

**Extension Proposal**

[VK_KHR_dynamic_rendering_local_read](../../../../features/latest/features/proposals/VK_KHR_dynamic_rendering_local_read.html)

**Last Modified Date**

2023-11-03

**Contributors**

* 
Tobias Hector, AMD

* 
Hans-Kristian Arntzen, Valve

* 
Connor Abbott, Valve

* 
Pan Gao, Huawei

* 
Lionel Landwerlin, Intel

* 
Shahbaz Youssefi, Google

* 
Alyssa Rosenzweig, Valve

* 
Jan-Harald Fredriksen, Arm

* 
Mike Blumenkrantz, Valve

* 
Graeme Leese, Broadcom

* 
Piers Daniell, Nvidia

* 
Stuart Smith, AMD

* 
Daniel Story, Nintendo

* 
James Fitzpatrick, Imagination

* 
Piotr Byszewski, Mobica

* 
Spencer Fricke, LunarG

* 
Tom Olson, Arm

* 
Michal Pietrasiuk, Intel

* 
Matthew Netsch, Qualcomm

* 
Marty Johnson, Khronos

* 
Wyvern Wang, Huawei

* 
Jeff Bolz, Nvidia

* 
Samuel (Sheng-Wen) Huang, MediaTek

This extension enables reads from attachments and resources written by
previous fragment shaders within a dynamic render pass.

* 
[vkCmdSetRenderingAttachmentLocationsKHR](vkCmdSetRenderingAttachmentLocations.html)

* 
[vkCmdSetRenderingInputAttachmentIndicesKHR](vkCmdSetRenderingInputAttachmentIndices.html)

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkRenderingAttachmentLocationInfoKHR](VkRenderingAttachmentLocationInfo.html)

* 
[VkRenderingInputAttachmentIndexInfoKHR](VkRenderingInputAttachmentIndexInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR](VkPhysicalDeviceDynamicRenderingLocalReadFeatures.html)

* 
`VK_KHR_DYNAMIC_RENDERING_LOCAL_READ_EXTENSION_NAME`

* 
`VK_KHR_DYNAMIC_RENDERING_LOCAL_READ_SPEC_VERSION`

* 
Extending [VkImageLayout](VkImageLayout.html):

[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR](VkImageLayout.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4, with the KHR
suffix omitted.
However, Vulkan 1.4 implementations only have to support local read for
storage resources and single sampled color attachments.

Support for reading depth/stencil attachments and multi-sampled attachments
are respectively gated behind the new boolean
`dynamicRenderingLocalReadDepthStencilAttachments` and
`dynamicRenderingLocalReadMultisampledAttachments` properties, as
described in the [Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) appendix.

The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2023-11-03 (Tobias Hector)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering_local_read).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
