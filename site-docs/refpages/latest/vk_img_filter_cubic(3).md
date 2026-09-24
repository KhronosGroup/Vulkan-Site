# VK_IMG_filter_cubic(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_IMG_filter_cubic.html

## Table of Contents

- [Name](#_name)
- [VK_IMG_filter_cubic](#VK_IMG_filter_cubic)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Example](#_example)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_IMG_filter_cubic - device extension

**Name String**

`VK_IMG_filter_cubic`

**Extension Type**

Device extension

**Registered Extension Number**

16

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_IMG_filter_cubic] @tobski%0A*Here describe the issue or question you have about the VK_IMG_filter_cubic extension*)

**Last Modified Date**

2016-02-23

**Contributors**

* 
Tobias Hector, Imagination Technologies

`VK_IMG_filter_cubic` adds an additional, high quality cubic filtering mode
to Vulkan, using a Catmull-Rom bicubic filter.
Performing this kind of filtering can be done in a shader by using 16
samples and a number of instructions, but this can be inefficient.
The cubic filter mode exposes an optimized high quality texture sampling
using fixed texture sampling functionality.

* 
`VK_IMG_FILTER_CUBIC_EXTENSION_NAME`

* 
`VK_IMG_FILTER_CUBIC_SPEC_VERSION`

* 
Extending [VkFilter](VkFilter.html):

[VK_FILTER_CUBIC_IMG](VkFilter.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_IMG](VkFormatFeatureFlagBits.html)

Creating a sampler with the new filter for both magnification and
minification

    VkSamplerCreateInfo createInfo =
    {
        .sType = VK_STRUCTURE_TYPE_SAMPLER_CREATE_INFO,
        // Other members set to application-desired values
    };

    createInfo.magFilter = VK_FILTER_CUBIC_IMG;
    createInfo.minFilter = VK_FILTER_CUBIC_IMG;

    VkSampler sampler;
    VkResult result = vkCreateSampler(
        device,
        &createInfo,
        &sampler);

* 
Revision 1, 2016-02-23 (Tobias Hector)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_IMG_filter_cubic).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
