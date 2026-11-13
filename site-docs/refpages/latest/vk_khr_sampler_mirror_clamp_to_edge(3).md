# VK_KHR_sampler_mirror_clamp_to_edge(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_sampler_mirror_clamp_to_edge.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_sampler_mirror_clamp_to_edge](#VK_KHR_sampler_mirror_clamp_to_edge)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Example](#_example)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_sampler_mirror_clamp_to_edge - device extension

**Name String**

`VK_KHR_sampler_mirror_clamp_to_edge`

**Extension Type**

Device extension

**Registered Extension Number**

15

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_sampler_mirror_clamp_to_edge] @tobski%0A*Here describe the issue or question you have about the VK_KHR_sampler_mirror_clamp_to_edge extension*)

**Last Modified Date**

2019-08-17

**Contributors**

* 
Tobias Hector, Imagination Technologies

* 
Jon Leech, Khronos

`VK_KHR_sampler_mirror_clamp_to_edge` extends the set of sampler address
modes to include an additional mode
([VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html)) that effectively uses a
texture map twice as large as the original image in which the additional
half of the new image is a mirror image of the original image.

This new mode relaxes the need to generate images whose opposite edges match
by using the original image to generate a matching “mirror image”.
This mode allows the texture to be mirrored only once in the negative s, t,
and r directions.

All functionality in this extension is included in core Vulkan 1.2.
However, if Vulkan 1.2 is supported and this extension is not, the
[VkSamplerAddressMode](VkSamplerAddressMode.html)
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html) is optional.
Since the original extension did not use an author suffix on the enum
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html), it is used by both core
and extension implementations.

* 
`VK_KHR_SAMPLER_MIRROR_CLAMP_TO_EDGE_EXTENSION_NAME`

* 
`VK_KHR_SAMPLER_MIRROR_CLAMP_TO_EDGE_SPEC_VERSION`

* 
Extending [VkSamplerAddressMode](VkSamplerAddressMode.html):

[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html)

* 
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE_KHR](VkSamplerAddressMode.html)

Creating a sampler with the new address mode in each dimension

    VkSamplerCreateInfo createInfo =
    {
        .sType = VK_STRUCTURE_TYPE_SAMPLER_CREATE_INFO,
        // Other members set to application-desired values
    };

    createInfo.addressModeU = VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE;
    createInfo.addressModeV = VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE;
    createInfo.addressModeW = VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE;

    VkSampler sampler;
    VkResult result = vkCreateSampler(
        device,
        &createInfo,
        &sampler);

1) Why are both KHR and core versions of the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html) token present?

**RESOLVED**: This functionality was intended to be required in Vulkan 1.0.
We realized shortly before public release that not all implementations could
support it, and moved the functionality into an optional extension, but did
not apply the KHR extension suffix.
Adding a KHR-suffixed alias of the non-suffixed enum has been done to comply
with our own naming rules.

In a related change, before spec revision 1.1.121 this extension was
hardwiring into the spec Makefile so it was always included with the
Specification, even in the core-only versions.
This has now been reverted, and it is treated as any other extension.

* 
Revision 1, 2016-02-16 (Tobias Hector)

Initial draft

Revision 2, 2019-08-14 (Jon Leech)

* 
Add KHR-suffixed alias of non-suffixed enum.

Revision 3, 2019-08-17 (Jon Leech)

* 
Add an issue explaining the reason for the extension API not being
suffixed with KHR.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_sampler_mirror_clamp_to_edge).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
