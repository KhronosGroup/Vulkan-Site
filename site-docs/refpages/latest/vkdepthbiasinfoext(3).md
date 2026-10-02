# VkDepthBiasInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDepthBiasInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDepthBiasInfoEXT - Structure specifying depth bias parameters

The `VkDepthBiasInfoEXT` structure is defined as:

// Provided by VK_EXT_depth_bias_control
typedef struct VkDepthBiasInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    float              depthBiasConstantFactor;
    float              depthBiasClamp;
    float              depthBiasSlopeFactor;
} VkDepthBiasInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthBiasConstantFactor` is a scalar factor controlling the
constant depth value added to each fragment.

* 
`depthBiasClamp` is the maximum (or minimum) depth bias of a
fragment.

* 
`depthBiasSlopeFactor` is a scalar factor applied to a fragment’s
slope in depth bias calculations.

If `pNext` does not contain a [VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html)
structure, then this command is equivalent to including a
[VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html) with `depthBiasExact` set to
[VK_FALSE](VK_FALSE.html) and `depthBiasRepresentation` set to
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORMAT_EXT](VkDepthBiasRepresentationEXT.html).

Valid Usage

* 
[](#VUID-VkDepthBiasInfoEXT-depthBiasClamp-08950) VUID-VkDepthBiasInfoEXT-depthBiasClamp-08950

If the [`depthBiasClamp`](../../../../spec/latest/chapters/features.html#features-depthBiasClamp) feature is not
enabled, `depthBiasClamp` **must** be `0.0`

Valid Usage (Implicit)

* 
[](#VUID-VkDepthBiasInfoEXT-sType-sType) VUID-VkDepthBiasInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEPTH_BIAS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDepthBiasInfoEXT-pNext-pNext) VUID-VkDepthBiasInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html)

* 
[](#VUID-VkDepthBiasInfoEXT-sType-unique) VUID-VkDepthBiasInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_EXT_depth_bias_control](VK_EXT_depth_bias_control.html), [VkStructureType](VkStructureType.html), [vkCmdSetDepthBias2EXT](vkCmdSetDepthBias2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkDepthBiasInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
