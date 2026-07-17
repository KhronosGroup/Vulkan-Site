# VK_QCOM_ycbcr_degamma(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_ycbcr_degamma.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_ycbcr_degamma](#VK_QCOM_ycbcr_degamma)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_ycbcr_degamma - device extension

**Name String**

`VK_QCOM_ycbcr_degamma`

**Extension Type**

Device extension

**Registered Extension Number**

521

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_ycbcr_degamma] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_ycbcr_degamma extension*)

**Last Modified Date**

2023-07-31

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

None

**Contributors**

* 
Jeff Leger, Qualcomm

* 
Jonathan Wicks, Qualcomm

This extension allows implementations to expose support for “sRGB EOTF”
also known as “sRGB degamma”, used in combination with images using 8-bit
Y′CBCR formats.
In addition, the degamma can be selectively applied to the Y (luma) or CrCb
(chroma).

`[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)` adds support for Y′CBCR
conversion, but allows texture sampling in a non-linear space which can
cause artifacts.
This extension allows implementations to expose sRGB degamma for Y′CBCR
formats, which is performed during texture filtering, allowing texture
filtering to operate in a linear space.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceYcbcrDegammaFeaturesQCOM](VkPhysicalDeviceYcbcrDegammaFeaturesQCOM.html)

Extending [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html):

* 
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html)

* 
`VK_QCOM_YCBCR_DEGAMMA_EXTENSION_NAME`

* 
`VK_QCOM_YCBCR_DEGAMMA_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_DEGAMMA_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_YCBCR_DEGAMMA_CREATE_INFO_QCOM](VkStructureType.html)

1) Which Y′CBCR formats support the degamma feature?

**RESOLVED**: For implementations that support the extension, each format that
contains 8-bit R, G, and B components and supports either
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html) must support degamma.

Since non-compressed Vulkan sRGB formats are already limited to 8-bit
components, and since Adreno supports degamma for all 8bit Y′CBCR formats,
this extension does not introduce a new VK_FORMAT_FEATURE* bit for the
degamma feature.

2) On which Y′CBCR components is the degamma applied?

**RESOLVED**: While degamma is expected to be applied to only the Y (luma)
component, the extension provides the ability to selectively enable degamma
for both the Y (luma) and/or CbCr (chroma) components.

3) Should degamma be enabled for the sampler object or for the image view
object?

**RESOLVED**: Both.
This extension extends [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) and the
specification already requires that both sampler and view objects must be
created with an *identical* [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) in
their pNext chains.

4) Why apply the “sRGB” transfer function directly to Y′CBCR data when it
would be more correct to use the “ITU transfer function”, and do so only
after the values have been converted into non-linear R’G’B'?

**RESOLVED**: Y′CBCR is frequently stored according to standards (e.g. BT.601
and BT.709) that specify that the conversion between linear and non-linear
should use the ITU Transfer function.
The ITU transfer function is mathematically different from the sRGB transfer
function and while sRGB and ITU define similar curves, the difference is
significant.
Performing the “sRGB degamma” prior to range expansion can introduce
artifacts if the content uses [VK_SAMPLER_YCBCR_RANGE_ITU_NARROW](VkSamplerYcbcrRange.html)
encoding.
Nevertheless, using sRGB can make sense for certain use cases where camera
YCbCr images are known to be encoded with sRGB (or a pure gamma 2.2)
transfer function and are known to use full-range encoding.

For those use cases, this extension leverages the GPU ability to enable sRGB
degamma at little cost, and can improve quality because texture filtering is
able to occur in linear space.

* 
Revision 1, 2023-07-31 (Jeff Leger)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_ycbcr_degamma).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
