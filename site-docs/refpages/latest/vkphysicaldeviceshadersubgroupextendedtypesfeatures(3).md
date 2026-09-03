# VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures - Structure describing the extended types subgroups support feature for an implementation

The `VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures` structure is
defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupExtendedTypes;
} VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures;

// Provided by VK_KHR_shader_subgroup_extended_types
// Equivalent to VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures
typedef VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures VkPhysicalDeviceShaderSubgroupExtendedTypesFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderSubgroupExtendedTypes` is a boolean specifying whether
subgroup operations can use 8-bit integer, 16-bit integer, 64-bit
integer, 16-bit floating-point, and vectors of these types in
[group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) with
[subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup), if the implementation
supports the types.

If the `VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_subgroup_extended_types](VK_KHR_shader_subgroup_extended_types.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
