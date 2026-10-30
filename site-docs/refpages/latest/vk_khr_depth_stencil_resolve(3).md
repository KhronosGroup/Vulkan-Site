# VK_KHR_depth_stencil_resolve(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_depth_stencil_resolve.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_depth_stencil_resolve](#VK_KHR_depth_stencil_resolve)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Additional Resources](#_additional_resources)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_depth_stencil_resolve - device extension

**Name String**

`VK_KHR_depth_stencil_resolve`

**Extension Type**

Device extension

**Registered Extension Number**

200

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Jan-Harald Fredriksen [janharald](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_depth_stencil_resolve] @janharald%0A*Here describe the issue or question you have about the VK_KHR_depth_stencil_resolve extension*)

**Last Modified Date**

2018-04-09

**Contributors**

* 
Jan-Harald Fredriksen, Arm

* 
Andrew Garrard, Samsung Electronics

* 
Soowan Park, Samsung Electronics

* 
Jeff Bolz, NVIDIA

* 
Daniel Rakos, AMD

This extension adds support for automatically resolving multisampled
depth/stencil attachments in a subpass in a similar manner as for color
attachments.

Multisampled color attachments can be resolved at the end of a subpass by
specifying `pResolveAttachments` entries corresponding to the
`pColorAttachments` array entries.
This does not allow for a way to map the resolve attachments to the
depth/stencil attachment.
The [vkCmdResolveImage](vkCmdResolveImage.html) command does not allow for depth/stencil images.
While there are other ways to resolve the depth/stencil attachment, they can
give sub-optimal performance.
Extending the `VkSubpassDescription2` in this extension allows an
application to add a `pDepthStencilResolveAttachment`, that is similar
to the color `pResolveAttachments`, that the
`pDepthStencilAttachment` can be resolved into.

Depth and stencil samples are resolved to a single value based on the
resolve mode.
The set of possible resolve modes is defined in the
[VkResolveModeFlagBits](VkResolveModeFlagBits.html) enum.
The [VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](VkResolveModeFlagBits.html) mode is the only mode that is
required of all implementations (that support the extension or support
Vulkan 1.2 or higher).
Some implementations may also support averaging (the same as color sample
resolve) or taking the minimum or maximum sample, which may be more suitable
for depth/stencil resolve.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceDepthStencilResolvePropertiesKHR](VkPhysicalDeviceDepthStencilResolveProperties.html)

Extending [VkSubpassDescription2](VkSubpassDescription2.html):

* 
[VkSubpassDescriptionDepthStencilResolveKHR](VkSubpassDescriptionDepthStencilResolve.html)

* 
[VkResolveModeFlagBitsKHR](VkResolveModeFlagBits.html)

* 
[VkResolveModeFlagsKHR](VkResolveModeFlags.html)

* 
`VK_KHR_DEPTH_STENCIL_RESOLVE_EXTENSION_NAME`

* 
`VK_KHR_DEPTH_STENCIL_RESOLVE_SPEC_VERSION`

* 
Extending [VkResolveModeFlagBits](VkResolveModeFlagBits.html):

[VK_RESOLVE_MODE_AVERAGE_BIT_KHR](VkResolveModeFlagBits.html)

* 
[VK_RESOLVE_MODE_MAX_BIT_KHR](VkResolveModeFlagBits.html)

* 
[VK_RESOLVE_MODE_MIN_BIT_KHR](VkResolveModeFlagBits.html)

* 
[VK_RESOLVE_MODE_NONE_KHR](VkResolveModeFlagBits.html)

* 
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT_KHR](VkResolveModeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE_KHR](VkStructureType.html)

* 
GDC 2019

[`video`](https://www.youtube.com/watch?v=GnnEmJFFC7Q&feature=youtu.be&t=1983)

* 
[`slides`](https://www.khronos.org/assets/uploads/developers/library/2019-gdc/Vulkan-Depth-Stencil-Resolve-GDC-Mar19.pdf)

* 
Revision 1, 2018-04-09 (Jan-Harald Fredriksen)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_depth_stencil_resolve).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
