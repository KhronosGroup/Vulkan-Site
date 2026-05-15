# VK_KHR_maintenance2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance2](#VK_KHR_maintenance2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Input Attachment Specification](#_input_attachment_specification)
- [Input_Attachment_Specification](#_input_attachment_specification)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Input Attachment Specification Example](#_input_attachment_specification_example)
- [Input_Attachment_Specification_Example](#_input_attachment_specification_example)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance2 - device extension

**Name String**

`VK_KHR_maintenance2`

**Extension Type**

Device extension

**Registered Extension Number**

118

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Michael Worcester [michaelworcester](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance2] @michaelworcester%0A*Here describe the issue or question you have about the VK_KHR_maintenance2 extension*)

**Last Modified Date**

2017-09-05

**Contributors**

* 
Michael Worcester, Imagination Technologies

* 
Stuart Smith, Imagination Technologies

* 
Jeff Bolz, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Jan-Harald Fredriksen, ARM

* 
Daniel Rakos, AMD

* 
Neil Henning, Codeplay

* 
Piers Daniell, NVIDIA

`VK_KHR_maintenance2` adds a collection of minor features that were
intentionally left out or overlooked from the original Vulkan 1.0 release.

The new features are as follows:

* 
Allow the application to specify which aspect of an input attachment
might be read for a given subpass.

* 
Allow implementations to express the clipping behavior of points.

* 
Allow creating images with usage flags that may not be supported for the
base image’s format, but are supported for image views of the image that
have a different but compatible format.

* 
Allow creating uncompressed image views of compressed images.

* 
Allow the application to select between an upper-left and lower-left
origin for the tessellation domain space.

* 
Adds two new image layouts for depth stencil images to allow either the
depth or stencil aspect to be read-only while the other aspect is
writable.

Input attachment specification allows an application to specify which aspect
of a multi-aspect image (e.g. a depth/stencil format) will be accessed via a
`subpassLoad` operation.

On some implementations there **may** be a performance penalty if the
implementation does not know (at [vkCreateRenderPass](vkCreateRenderPass.html) time) which
aspect(s) of multi-aspect images **can** be accessed as input attachments.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[VkInputAttachmentAspectReferenceKHR](VkInputAttachmentAspectReference.html)

* 
Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

[VkImageViewUsageCreateInfoKHR](VkImageViewUsageCreateInfo.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePointClippingPropertiesKHR](VkPhysicalDevicePointClippingProperties.html)

Extending [VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html):

* 
[VkPipelineTessellationDomainOriginStateCreateInfoKHR](VkPipelineTessellationDomainOriginStateCreateInfo.html)

Extending [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html):

* 
[VkRenderPassInputAttachmentAspectCreateInfoKHR](VkRenderPassInputAttachmentAspectCreateInfo.html)

* 
[VkPointClippingBehaviorKHR](VkPointClippingBehavior.html)

* 
[VkTessellationDomainOriginKHR](VkTessellationDomainOrigin.html)

* 
`VK_KHR_MAINTENANCE2_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE2_SPEC_VERSION`

* 
`VK_KHR_MAINTENANCE_2_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_2_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT_KHR](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

Extending [VkPointClippingBehavior](VkPointClippingBehavior.html):

* 
[VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES_KHR](VkPointClippingBehavior.html)

* 
[VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY_KHR](VkPointClippingBehavior.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO_KHR](VkStructureType.html)

Extending [VkTessellationDomainOrigin](VkTessellationDomainOrigin.html):

* 
[VK_TESSELLATION_DOMAIN_ORIGIN_LOWER_LEFT_KHR](VkTessellationDomainOrigin.html)

* 
[VK_TESSELLATION_DOMAIN_ORIGIN_UPPER_LEFT_KHR](VkTessellationDomainOrigin.html)

Consider the case where a render pass has two subpasses and two attachments.

Attachment 0 has the format [VK_FORMAT_D24_UNORM_S8_UINT](VkFormat.html), attachment 1
has some color format.

Subpass 0 writes to attachment 0, subpass 1 reads only the depth information
from attachment 0 (using inputAttachmentRead) and writes to attachment 1.

    VkInputAttachmentAspectReferenceKHR references[] = {
        {
            .subpass = 1,
            .inputAttachmentIndex = 0,
            .aspectMask = VK_IMAGE_ASPECT_DEPTH_BIT
        }
    };

    VkRenderPassInputAttachmentAspectCreateInfoKHR specifyAspects = {
        .sType = VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO_KHR,
        .pNext = NULL,
        .aspectReferenceCount = 1,
        .pAspectReferences = references
    };

    VkRenderPassCreateInfo createInfo = {
        ...
        .pNext = &specifyAspects,
        ...
    };

    vkCreateRenderPass(...);

1) What is the default tessellation domain origin?

**RESOLVED**: Vulkan 1.0 originally inadvertently documented a lower-left
origin, but the conformance tests and all implementations implemented an
upper-left origin.
This extension adds a control to select between lower-left (for
compatibility with OpenGL) and upper-left, and we retroactively fix
unextended Vulkan to have a default of an upper-left origin.

* 
Revision 1, 2017-04-28

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
