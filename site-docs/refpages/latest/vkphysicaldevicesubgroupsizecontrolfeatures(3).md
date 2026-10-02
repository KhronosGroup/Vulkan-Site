# VkPhysicalDeviceSubgroupSizeControlFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSubgroupSizeControlFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSubgroupSizeControlFeatures - Structure describing the subgroup size control features that can be supported by an implementation

The `VkPhysicalDeviceSubgroupSizeControlFeatures` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceSubgroupSizeControlFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subgroupSizeControl;
    VkBool32           computeFullSubgroups;
} VkPhysicalDeviceSubgroupSizeControlFeatures;

// Provided by VK_EXT_subgroup_size_control
// Equivalent to VkPhysicalDeviceSubgroupSizeControlFeatures
typedef VkPhysicalDeviceSubgroupSizeControlFeatures VkPhysicalDeviceSubgroupSizeControlFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`subgroupSizeControl` indicates whether the implementation supports
controlling shader subgroup sizes via the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
flag and the [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)
structure.

* 

`computeFullSubgroups` indicates whether the implementation supports
requiring full subgroups in compute
, mesh, or task
shaders via the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) flag.

If the `VkPhysicalDeviceSubgroupSizeControlFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceSubgroupSizeControlFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

|  | The `VkPhysicalDeviceSubgroupSizeControlFeaturesEXT` structure was added
| --- | --- |
in version 2 of the `[VK_EXT_subgroup_size_control](VK_EXT_subgroup_size_control.html)` extension.
Version 1 implementations of this extension will not fill out the features
structure but applications may assume that both `subgroupSizeControl`
and `computeFullSubgroups` are supported if the extension is supported.
(See also the [Feature Requirements](../../../../spec/latest/chapters/features.html#features-requirements) section.)
Applications are advised to add a
`VkPhysicalDeviceSubgroupSizeControlFeaturesEXT` structure to the
`pNext` chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) to enable the features
regardless of the version of the extension supported by the implementation.
If the implementation only supports version 1, it will safely ignore the
`VkPhysicalDeviceSubgroupSizeControlFeaturesEXT` structure.

Vulkan 1.3 implementations always support the features structure. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubgroupSizeControlFeatures-sType-sType) VUID-VkPhysicalDeviceSubgroupSizeControlFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_subgroup_size_control](VK_EXT_subgroup_size_control.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceSubgroupSizeControlFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
