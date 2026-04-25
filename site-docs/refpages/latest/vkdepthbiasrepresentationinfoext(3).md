# VkDepthBiasRepresentationInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDepthBiasRepresentationInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDepthBiasRepresentationInfoEXT - Structure specifying depth bias parameters

The `VkDepthBiasRepresentationInfoEXT` structure is defined as:

// Provided by VK_EXT_depth_bias_control
typedef struct VkDepthBiasRepresentationInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDepthBiasRepresentationEXT    depthBiasRepresentation;
    VkBool32                        depthBiasExact;
} VkDepthBiasRepresentationInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthBiasRepresentation` is a [VkDepthBiasRepresentationEXT](VkDepthBiasRepresentationEXT.html)
value specifying the depth bias representation.

* 
`depthBiasExact` specifies that the implementation is not allowed to
scale the depth bias value to ensure a minimum resolvable distance.

Valid Usage

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-leastRepresentableValueForceUnormRepresentation-08947) VUID-VkDepthBiasRepresentationInfoEXT-leastRepresentableValueForceUnormRepresentation-08947

If the [    `leastRepresentableValueForceUnormRepresentation`](../../../../spec/latest/chapters/features.html#features-leastRepresentableValueForceUnormRepresentation) feature is not
enabled, `depthBiasRepresentation` **must** not be
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](VkDepthBiasRepresentationEXT.html)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-floatRepresentation-08948) VUID-VkDepthBiasRepresentationInfoEXT-floatRepresentation-08948

If the [`floatRepresentation`](../../../../spec/latest/chapters/features.html#features-floatRepresentation)
feature is not enabled, `depthBiasRepresentation` **must** not be
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](VkDepthBiasRepresentationEXT.html)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-depthBiasExact-08949) VUID-VkDepthBiasRepresentationInfoEXT-depthBiasExact-08949

If the [`depthBiasExact`](../../../../spec/latest/chapters/features.html#features-depthBiasExact) feature is not
enabled, `depthBiasExact` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-sType-sType) VUID-VkDepthBiasRepresentationInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEPTH_BIAS_REPRESENTATION_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-depthBiasRepresentation-parameter) VUID-VkDepthBiasRepresentationInfoEXT-depthBiasRepresentation-parameter

 `depthBiasRepresentation` **must** be a valid [VkDepthBiasRepresentationEXT](VkDepthBiasRepresentationEXT.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDepthBiasInfoEXT](VkDepthBiasInfoEXT.html)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VK_EXT_depth_bias_control](VK_EXT_depth_bias_control.html), `VkBool32`, [VkDepthBiasRepresentationEXT](VkDepthBiasRepresentationEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkDepthBiasRepresentationInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
