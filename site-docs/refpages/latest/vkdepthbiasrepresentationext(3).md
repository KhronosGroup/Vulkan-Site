# VkDepthBiasRepresentationEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDepthBiasRepresentationEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDepthBiasRepresentationEXT - Specify the depth bias representation

Possible values of
[VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html)::`depthBiasRepresentation`,
specifying the depth bias representation are:

// Provided by VK_EXT_depth_bias_control
typedef enum VkDepthBiasRepresentationEXT {
    VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORMAT_EXT = 0,
    VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT = 1,
    VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT = 2,
} VkDepthBiasRepresentationEXT;

* 
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORMAT_EXT](#)
specifies that the depth bias representation is a factor of the format’s
r as described in [Depth Bias Computation](../../../../spec/latest/chapters/primsrast.html#primsrast-depthbias-computation).

* 
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](#)
specifies that the depth bias representation is a factor of a constant
r defined by the bit-size or mantissa of the format as described
in [Depth Bias Computation](../../../../spec/latest/chapters/primsrast.html#primsrast-depthbias-computation).

* 
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](#) specifies that the depth
bias representation is a factor of constant r equal to 1.

[VK_EXT_depth_bias_control](VK_EXT_depth_bias_control.html), [VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkDepthBiasRepresentationEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
