# VkPhysicalDeviceCooperativeMatrixInfo2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCooperativeMatrixInfo2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCooperativeMatrixInfo2EXT - Structure specifying cooperative matrix properties info

The `VkPhysicalDeviceCooperativeMatrixInfo2EXT` structure is defined as:

// Provided by VK_EXT_cooperative_matrix_maintenance1
typedef struct VkPhysicalDeviceCooperativeMatrixInfo2EXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkScopeKHR                     scope;
    uint32_t                       invocations;
    uint32_t                       subgroupSize;
    VkCooperativeMatrixFlagsEXT    flags;
} VkPhysicalDeviceCooperativeMatrixInfo2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`scope` is the scope of the matrices, of type [VkScopeKHR](VkScopeKHR.html).

* 
`invocations` is the number of invocations within the local
workgroup.
`invocations` is ignored unless `scope` is
[VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html).

* 
`subgroupSize` is the size of the subgroup.

* 
`flags` is a bitmask of [VkCooperativeMatrixFlagBitsEXT](VkCooperativeMatrixFlagBitsEXT.html)
selecting which class of matrix properties are being queried.

If `subgroupSize` is equal to `0`, then the properties returned will be
valid for use with shaders that execute with a varying subgroup size, and
the returned properties are not guaranteed to be valid for any specific
effective subgroup size.

If `scope` is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), `invocations` specifies
the number of invocations in the local workgroup, otherwise the properties
returned will be valid for all supported local workgroup sizes.

|  | If `scope` is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html) scope, the retrieved
| --- | --- |
properties will only be valid for shaders in which `invocations` is a
multiple of the shader’s effective subgroup size. |

|  | The intended usage of `subgroupSize` is:
| --- | --- |

* 
If the matrix will be used with a pipeline that enables
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
or a shader that enables
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](VkShaderCreateFlagBitsEXT.html),
or a SPIR-V module version 1.6 or later with no required subgroup size
specified, the application should query the properties with
`subgroupSize` equal to `0`, since the effective subgroup size is
not known at pipeline creation time.

* 
If the matrix will be used with a shader whose subgroup size is forced
via [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html),
or [VkShaderRequiredSubgroupSizeCreateInfoEXT](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) for shader objects,
the application should query with `subgroupSize` equal to the
required value.

* 
Otherwise (the SPIR-V module version is less than 1.6, and the shader
neither requests a specific subgroup size nor allows it to vary), the
effective subgroup size is
[VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`subgroupSize`, and the
application should query with that value. |

Valid Usage

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13372) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13372

`scope` **must** equal [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html)
or [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-cooperativeMatrixWorkgroupScope-13373) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-cooperativeMatrixWorkgroupScope-13373

If the [](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixWorkgroupScope)[VkPhysicalDeviceCooperativeMatrix2FeaturesNV](VkPhysicalDeviceCooperativeMatrix2FeaturesNV.html)::`cooperativeMatrixWorkgroupScope`
feature is not supported,
`scope` **must** not equal [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-subgroupSize-13374) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-subgroupSize-13374

If `subgroupSize` does not equal `0`, `subgroupSize` **must** be a
power of two

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13375) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13375

If `scope` is [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html), `subgroupSize` does
not equal `0`, and the
[`subgroupSizeControl`](../../../../spec/latest/chapters/features.html#features-subgroupSizeControl) feature is
supported, `subgroupSize` **must** be greater or equal to
[`minSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-minSubgroupSize)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13376) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13376

If `scope` is [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html) and the
[`subgroupSizeControl`](../../../../spec/latest/chapters/features.html#features-subgroupSizeControl) feature is
supported, `subgroupSize` **must** be less than or equal to
[`maxSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13377) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13377

If `scope` is [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html),
the [`subgroupSizeControl`](../../../../spec/latest/chapters/features.html#features-subgroupSizeControl) feature
is not supported,
and `subgroupSize` does not equal `0`, `subgroupSize` **must** be
equal to [VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`subgroupSize`

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-invocations-13378) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-invocations-13378

If scope is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), `invocations` **must** be a
power of two

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-subgroupSize-13379) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-subgroupSize-13379

If scope is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), and `subgroupSize` does
not equal `0`, `invocations` **must** be a multiple of
`subgroupSize`

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13380) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-13380

If `scope` is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), `invocations` **must**
be less than or equal to
[`cooperativeMatrixWorkgroupScopeMaxWorkgroupSize`](../../../../spec/latest/chapters/limits.html#limits-cooperativeMatrixWorkgroupScopeMaxWorkgroupSize)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-invocations-13381) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-invocations-13381

If scope is not [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), `invocations` **must** be
equal `0`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_INFO_2_EXT](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-pNext-pNext) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-parameter) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-scope-parameter

 `scope` **must** be a valid [VkScopeKHR](VkScopeKHR.html) value

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-flags-parameter) VUID-VkPhysicalDeviceCooperativeMatrixInfo2EXT-flags-parameter

 `flags` **must** be a valid combination of [VkCooperativeMatrixFlagBitsEXT](VkCooperativeMatrixFlagBitsEXT.html) values

[VK_EXT_cooperative_matrix_maintenance1](VK_EXT_cooperative_matrix_maintenance1.html), [VkCooperativeMatrixFlagsEXT](VkCooperativeMatrixFlagsEXT.html), [VkScopeKHR](VkScopeKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceCooperativeMatrixProperties2EXT](vkGetPhysicalDeviceCooperativeMatrixProperties2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkPhysicalDeviceCooperativeMatrixInfo2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
