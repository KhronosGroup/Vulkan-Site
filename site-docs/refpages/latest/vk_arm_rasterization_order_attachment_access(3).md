# VK_ARM_rasterization_order_attachment_access(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_rasterization_order_attachment_access.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_rasterization_order_attachment_access](#VK_ARM_rasterization_order_attachment_access)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_rasterization_order_attachment_access - device extension

**Name String**

`VK_ARM_rasterization_order_attachment_access`

**Extension Type**

Device extension

**Registered Extension Number**

343

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_rasterization_order_attachment_access](VK_EXT_rasterization_order_attachment_access.html)
extension

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_rasterization_order_attachment_access] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_ARM_rasterization_order_attachment_access extension*)

**Last Modified Date**

2026-01-16

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Jan-Harald Fredriksen, Arm

Render passes, and specifically subpass dependencies, enable much of the
same functionality as the framebuffer fetch and pixel local storage
extensions did for OpenGL ES.
But certain techniques such as programmable blending are awkward or
impractical to implement with these alone, in part because a self-dependency
is required every time a fragment will read a value at a given sample
coordinate.

This extension extends the mechanism of input attachments to allow access to
framebuffer attachments when used as both input and color, or depth/stencil,
attachments from one fragment to the next, in rasterization order, without
explicit synchronization.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesARM](VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT.html)

* 
`VK_ARM_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_EXTENSION_NAME`

* 
`VK_ARM_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_SPEC_VERSION`

* 
Extending [VkPipelineColorBlendStateCreateFlagBits](VkPipelineColorBlendStateCreateFlagBits.html):

[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_ARM](VkPipelineColorBlendStateCreateFlagBits.html)

Extending [VkPipelineDepthStencilStateCreateFlagBits](VkPipelineDepthStencilStateCreateFlagBits.html):

* 
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_ARM](VkPipelineDepthStencilStateCreateFlagBits.html)

* 
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_ARM](VkPipelineDepthStencilStateCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_ARM](VkStructureType.html)

Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_ARM](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_ARM](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_ARM](VkSubpassDescriptionFlagBits.html)

See the Issues for `[VK_EXT_rasterization_order_attachment_access](VK_EXT_rasterization_order_attachment_access.html)`.

None.

* 
Revision 1, 2021-11-12 (Jan-Harald Fredriksen)

Initial draft

* 
Updated Issues section 2026-01-16

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_rasterization_order_attachment_access).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
