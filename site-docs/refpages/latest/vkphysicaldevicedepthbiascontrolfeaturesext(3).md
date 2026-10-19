# VkPhysicalDeviceDepthBiasControlFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDepthBiasControlFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDepthBiasControlFeaturesEXT - Structure indicating support for depth bias scaling and representation control

The `VkPhysicalDeviceDepthBiasControlFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_depth_bias_control
typedef struct VkPhysicalDeviceDepthBiasControlFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthBiasControl;
    VkBool32           leastRepresentableValueForceUnormRepresentation;
    VkBool32           floatRepresentation;
    VkBool32           depthBiasExact;
} VkPhysicalDeviceDepthBiasControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthBiasControl` indicates whether
the implementation supports the `vkCmdSetDepthBias2EXT` command and
the `VkDepthBiasRepresentationInfoEXT` structure.

* 

`leastRepresentableValueForceUnormRepresentation` indicates whether
the implementation supports using the
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](VkDepthBiasRepresentationEXT.html)
depth bias representation.

* 
 `floatRepresentation` indicates
whether the implementation supports using the
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](VkDepthBiasRepresentationEXT.html) depth bias representation.

* 
 `depthBiasExact` indicates whether the
implementation supports forcing depth bias to not be scaled to ensure a
minimum resolvable difference using
`VkDepthBiasRepresentationInfoEXT`::`depthBiasExact`.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthBiasControlFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDepthBiasControlFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_BIAS_CONTROL_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_depth_bias_control](VK_EXT_depth_bias_control.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDepthBiasControlFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
