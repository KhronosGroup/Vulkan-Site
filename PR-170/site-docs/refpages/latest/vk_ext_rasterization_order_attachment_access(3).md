# VK_EXT_rasterization_order_attachment_access(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_rasterization_order_attachment_access.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_rasterization_order_attachment_access](#VK_EXT_rasterization_order_attachment_access)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_rasterization_order_attachment_access - device extension

**Name String**

`VK_EXT_rasterization_order_attachment_access`

**Extension Type**

Device extension

**Registered Extension Number**

464

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_rasterization_order_attachment_access] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_rasterization_order_attachment_access extension*)

**Extension Proposal**

[VK_EXT_rasterization_order_attachment_access](../../../../features/latest/features/proposals/VK_EXT_rasterization_order_attachment_access.html)

**Last Modified Date**

2026-01-16

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Jan-Harald Fredriksen, Arm

This extension extends the mechanism of input attachments to allow access to
framebuffer attachments that are used both as input and as color or
depth/stencil attachments from one fragment to the next, in rasterization
order, without explicit synchronization.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT](VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT.html)

* 
[VkPipelineColorBlendStateCreateFlagBits](VkPipelineColorBlendStateCreateFlagBits.html)

* 
[VkPipelineDepthStencilStateCreateFlagBits](VkPipelineDepthStencilStateCreateFlagBits.html)

* 
`VK_EXT_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_EXTENSION_NAME`

* 
`VK_EXT_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_SPEC_VERSION`

* 
Extending [VkPipelineColorBlendStateCreateFlagBits](VkPipelineColorBlendStateCreateFlagBits.html):

[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](VkPipelineColorBlendStateCreateFlagBits.html)

Extending [VkPipelineDepthStencilStateCreateFlagBits](VkPipelineDepthStencilStateCreateFlagBits.html):

* 
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)

* 
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_EXT](VkStructureType.html)

Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkSubpassDescriptionFlagBits.html)

1) What are the interactions with the `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)` or
`[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html)` extensions?

**RESOLVED**

Render pass instances begun with [vkCmdBeginRenderingKHR](vkCmdBeginRendering.html) do not have
input attachments and thus a different mechanism was needed to provide
similar functionality in this case.
This was provided by `[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html)`, which
enables reads from attachments and resources written by previous fragment
shaders within a dynamic render pass.

Render pass instances begun with [vkCmdBeginRenderingKHR](vkCmdBeginRendering.html) do not have
subpasses, and there is no equivalent to the following flag bits for these
instances:

* 
VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT

* 
VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT

* 
VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT

Instead, the behavior is controlled only by the corresponding pipeline flag
bits, i.e.:

* 
VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT

* 
VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT

* 
VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT

2) What is the interaction with the `[VK_EXT_shader_object](VK_EXT_shader_object.html)` extension?

**RESOLVED**

This functionality is not available for draw calls using shader objects
because the `[VK_EXT_shader_object](VK_EXT_shader_object.html)` extension depends on
`[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`, and thus neither the subpass flags nor
the pipeline flags defined in this extension can be specified.

None.

* 
Revision 1, 2022-07-04 (Jan-Harald Fredriksen)

Initial draft

* 
Updated Issues section 2026-01-16

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_rasterization_order_attachment_access).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
