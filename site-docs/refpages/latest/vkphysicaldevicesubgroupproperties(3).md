# VkPhysicalDeviceSubgroupProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSubgroupProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSubgroupProperties - Structure describing subgroup support for an implementation

The `VkPhysicalDeviceSubgroupProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceSubgroupProperties {
    VkStructureType           sType;
    void*                     pNext;
    uint32_t                  subgroupSize;
    VkShaderStageFlags        supportedStages;
    VkSubgroupFeatureFlags    supportedOperations;
    VkBool32                  quadOperationsInAllStages;
} VkPhysicalDeviceSubgroupProperties;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subgroupSize` is the default
number of invocations in each subgroup.
`subgroupSize` is at least 1 if any of the physical device’s queues
support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).
`subgroupSize` is a power-of-two.

* 

`supportedStages` is a bitfield of [VkShaderStageFlagBits](VkShaderStageFlagBits.html)
describing the shader stages that [group    operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) with [subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup) are
supported in.
`supportedStages` will have the [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)
bit set if any of the physical device’s queues support
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).

* 

`supportedOperations` is a bitmask of
[VkSubgroupFeatureFlagBits](VkSubgroupFeatureFlagBits.html) specifying the sets of
[group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) with
[subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup) supported on this device.
`supportedOperations` will have the
[VK_SUBGROUP_FEATURE_BASIC_BIT](VkSubgroupFeatureFlagBits.html) bit set if any of the physical
device’s queues support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).

* 

`quadOperationsInAllStages` is a boolean specifying whether
[quad group operations](../../../../spec/latest/chapters/shaders.html#shaders-quad-operations) are available in all
stages, or are restricted to fragment and compute stages.

If the `VkPhysicalDeviceSubgroupProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

If `supportedOperations` includes [](../../../../spec/latest/chapters/limits.html#features-subgroup-quad)[VK_SUBGROUP_FEATURE_QUAD_BIT](VkSubgroupFeatureFlagBits.html),
or the [`shaderSubgroupUniformControlFlow`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupUniformControlFlow) feature is enabled,
`subgroupSize` **must** be greater than or equal to 4.

If the [`shaderQuadControl`](../../../../spec/latest/chapters/features.html#features-shaderQuadControl) feature is
supported, `supportedOperations` **must** include [](../../../../spec/latest/chapters/limits.html#features-subgroup-quad)[VK_SUBGROUP_FEATURE_QUAD_BIT](VkSubgroupFeatureFlagBits.html).

If [VK_KHR_shader_subgroup_rotate](VK_KHR_shader_subgroup_rotate.html) is supported, and the implementation
advertises support with a [VkExtensionProperties](VkExtensionProperties.html)::`specVersion`
greater than or equal to 2, and the [`shaderSubgroupRotate`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotate) feature is supported,
[VK_SUBGROUP_FEATURE_ROTATE_BIT](VkSubgroupFeatureFlagBits.html) **must** be returned in
[VkPhysicalDeviceVulkan11Properties](VkPhysicalDeviceVulkan11Properties.html)::`subgroupSupportedOperations`
and
[VkPhysicalDeviceSubgroupProperties](#)::`supportedOperations`.
If [VK_KHR_shader_subgroup_rotate](VK_KHR_shader_subgroup_rotate.html) is supported, and the implementation
advertises support with a [VkExtensionProperties](VkExtensionProperties.html)::`specVersion`
greater than or equal to 2, and the
[`shaderSubgroupRotateClustered`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotateClustered) feature is supported,
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](VkSubgroupFeatureFlagBits.html) **must** be returned in
[VkPhysicalDeviceVulkan11Properties](VkPhysicalDeviceVulkan11Properties.html)::`subgroupSupportedOperations`
and
[VkPhysicalDeviceSubgroupProperties](#)::`supportedOperations`.

If Vulkan 1.4 is supported, [VK_SUBGROUP_FEATURE_ROTATE_BIT](VkSubgroupFeatureFlagBits.html) and
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](VkSubgroupFeatureFlagBits.html) **must** be returned in
[VkPhysicalDeviceSubgroupProperties](#)::`supportedOperations` and
[VkPhysicalDeviceVulkan11Properties](VkPhysicalDeviceVulkan11Properties.html)::`subgroupSupportedOperations`

|  | [VK_SUBGROUP_FEATURE_ROTATE_BIT](VkSubgroupFeatureFlagBits.html) and
| --- | --- |
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](VkSubgroupFeatureFlagBits.html) were added in version 2 of
the [VK_KHR_shader_subgroup_rotate](VK_KHR_shader_subgroup_rotate.html) extension, after the initial
release, so there are implementations that do not advertise these bits.
Applications should use the [`shaderSubgroupRotate`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotate) and [`shaderSubgroupRotateClustered`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotateClustered) features to determine and enable
support.
These bits are advertised here for consistency and for future dependencies. |

If the [`shaderSubgroupPartitioned`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupPartitioned) feature is supported,
`supportedOperations` **must** include [](../../../../spec/latest/chapters/limits.html#features-subgroup-partitioned)[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](VkSubgroupFeatureFlagBits.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubgroupProperties-sType-sType) VUID-VkPhysicalDeviceSubgroupProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [VkSubgroupFeatureFlags](VkSubgroupFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceSubgroupProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
