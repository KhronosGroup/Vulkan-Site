# VK_KHR_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance1](#VK_KHR_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance1 - device extension

**Name String**

`VK_KHR_maintenance1`

**Extension Type**

Device extension

**Registered Extension Number**

70

**Revision**

2

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
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance1] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_maintenance1 extension*)

**Last Modified Date**

2018-03-13

**Contributors**

* 
Dan Ginsburg, Valve

* 
Daniel Koch, NVIDIA

* 
Daniel Rakos, AMD

* 
Jan-Harald Fredriksen, ARM

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, NVIDIA

* 
Jesse Hall, Google

* 
John Kessenich, Google

* 
Michael Worcester, Imagination Technologies

* 
Neil Henning, Codeplay Software Ltd.

* 
Piers Daniell, NVIDIA

* 
Slawomir Grajewski, Intel

* 
Tobias Hector, Imagination Technologies

* 
Tom Olson, ARM

`VK_KHR_maintenance1` adds a collection of minor features that were
intentionally left out or overlooked from the original Vulkan 1.0 release.

The new features are as follows:

* 
Allow 2D and 2D array image views to be created from 3D images, which
can then be used as color framebuffer attachments.
This allows applications to render to slices of a 3D image.

* 
Support [vkCmdCopyImage](vkCmdCopyImage.html) between 2D array layers and 3D slices.
This extension allows copying from layers of a 2D array image to slices
of a 3D image and vice versa.

* 
Allow negative height to be specified in the
[VkViewport](VkViewport.html)::`height` field to perform y-inversion of the
clip-space to framebuffer-space transform.
This allows apps to avoid having to use `gl_Position.y = -gl_Position.y`
in shaders also targeting other APIs.

* 
Allow implementations to express support for doing just transfers and
clears of image formats that they otherwise support no other format
features for.
This is done by adding new format feature flags
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT_KHR](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT_KHR](VkFormatFeatureFlagBits.html).

* 
Support [vkCmdFillBuffer](vkCmdFillBuffer.html) on transfer-only queues.
Previously [vkCmdFillBuffer](vkCmdFillBuffer.html) was defined to only work on command
buffers allocated from command pools which support graphics or compute
queues.
It is now allowed on queues that just support transfer operations.

* 
Fix the inconsistency of how error conditions are returned between the
[vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html) and [vkCreateComputePipelines](vkCreateComputePipelines.html)
functions and the [vkAllocateDescriptorSets](vkAllocateDescriptorSets.html) and
[vkAllocateCommandBuffers](vkAllocateCommandBuffers.html) functions.

* 
Add new [VK_ERROR_OUT_OF_POOL_MEMORY_KHR](VkResult.html) error so implementations
can give a more precise reason for [vkAllocateDescriptorSets](vkAllocateDescriptorSets.html)
failures.

* 
Add a new command [vkTrimCommandPoolKHR](vkTrimCommandPool.html) which gives the
implementation an opportunity to release any unused command pool memory
back to the system.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkTrimCommandPoolKHR](vkTrimCommandPool.html)

* 
[VkCommandPoolTrimFlagsKHR](VkCommandPoolTrimFlags.html)

* 
`VK_KHR_MAINTENANCE1_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE1_SPEC_VERSION`

* 
`VK_KHR_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

[VK_FORMAT_FEATURE_TRANSFER_DST_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT_KHR](VkFormatFeatureFlagBits.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_OUT_OF_POOL_MEMORY_KHR](VkResult.html)

Are viewports with zero height allowed?

**RESOLVED**: Yes, although they have low utility.

* 
Revision 1, 2016-10-26 (Piers Daniell)

Internal revisions

Revision 2, 2018-03-13 (Jon Leech)

* 
Add issue for zero-height viewports

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
