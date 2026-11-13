# VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR - Structure describing barycentric support in fragment shaders that can be supported by an implementation

The `VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shader_barycentric
typedef struct VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentShaderBarycentric;
} VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR;

// Provided by VK_NV_fragment_shader_barycentric
// Equivalent to VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR
typedef VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR VkPhysicalDeviceFragmentShaderBarycentricFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentShaderBarycentric`
indicates that the implementation supports the `BaryCoordKHR` and
`BaryCoordNoPerspKHR` SPIR-V fragment shader built-ins and supports
the `PerVertexKHR` SPIR-V decoration on fragment shader input
variables.

See [Barycentric Interpolation](../../../../spec/latest/chapters/primsrast.html#primsrast-barycentric) for more
information.

If the `VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_fragment_shader_barycentric](VK_KHR_fragment_shader_barycentric.html), [VK_NV_fragment_shader_barycentric](VK_NV_fragment_shader_barycentric.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
