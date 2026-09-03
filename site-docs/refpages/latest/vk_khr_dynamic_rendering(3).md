# VK_KHR_dynamic_rendering(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_dynamic_rendering.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_dynamic_rendering](#VK_KHR_dynamic_rendering)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_dynamic_rendering - device extension

**Name String**

`VK_KHR_dynamic_rendering`

**Extension Type**

Device extension

**Registered Extension Number**

45

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_dynamic_rendering] @tobski%0A*Here describe the issue or question you have about the VK_KHR_dynamic_rendering extension*)

**Extension Proposal**

[VK_KHR_dynamic_rendering](../../../../features/latest/features/proposals/VK_KHR_dynamic_rendering.html)

**Last Modified Date**

2021-10-06

**Contributors**

* 
Tobias Hector, AMD

* 
Arseny Kapoulkine, Roblox

* 
François Duranleau, Gameloft

* 
Stuart Smith, AMD

* 
Hai Nguyen, Google

* 
Jean-François Roy, Google

* 
Jeff Leger, Qualcomm

* 
Jan-Harald Fredriksen, Arm

* 
Piers Daniell, Nvidia

* 
James Fitzpatrick, Imagination

* 
Piotr Byszewski, Mobica

* 
Jesse Hall, Google

* 
Mike Blumenkrantz, Valve

This extension allows applications to create single-pass render pass
instances without needing to create render pass objects or framebuffers.
Dynamic render passes can also span across multiple primary command buffers,
rather than relying on secondary command buffers.

This extension also incorporates [VK_ATTACHMENT_STORE_OP_NONE_KHR](VkAttachmentStoreOp.html) from
`[VK_QCOM_render_pass_store_ops](VK_QCOM_render_pass_store_ops.html)`, enabling applications to avoid
unnecessary synchronization when an attachment is not written during a
render pass.

* 
[vkCmdBeginRenderingKHR](vkCmdBeginRendering.html)

* 
[vkCmdEndRenderingKHR](vkCmdEndRendering.html)

* 
[VkRenderingAttachmentInfoKHR](VkRenderingAttachmentInfo.html)

* 
[VkRenderingInfoKHR](VkRenderingInfo.html)

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkCommandBufferInheritanceRenderingInfoKHR](VkCommandBufferInheritanceRenderingInfo.html)

Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

* 
[VkPipelineRenderingCreateInfoKHR](VkPipelineRenderingCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDynamicRenderingFeaturesKHR](VkPhysicalDeviceDynamicRenderingFeatures.html)

* 
[VkRenderingFlagBitsKHR](VkRenderingFlagBits.html)

* 
[VkRenderingFlagsKHR](VkRenderingFlags.html)

* 
`VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME`

* 
`VK_KHR_DYNAMIC_RENDERING_SPEC_VERSION`

* 
Extending [VkAttachmentStoreOp](VkAttachmentStoreOp.html):

[VK_ATTACHMENT_STORE_OP_NONE_KHR](VkAttachmentStoreOp.html)

Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

* 
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT_KHR](VkRenderingFlagBits.html)

* 
[VK_RENDERING_RESUMING_BIT_KHR](VkRenderingFlagBits.html)

* 
[VK_RENDERING_SUSPENDING_BIT_KHR](VkRenderingFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_INFO_KHR](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2021-10-06 (Tobias Hector)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
