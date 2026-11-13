# VkPhysicalDeviceVulkan13Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVulkan13Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVulkan13Features - Structure describing the Vulkan 1.3 features that can be supported by an implementation

The `VkPhysicalDeviceVulkan13Features` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceVulkan13Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustImageAccess;
    VkBool32           inlineUniformBlock;
    VkBool32           descriptorBindingInlineUniformBlockUpdateAfterBind;
    VkBool32           pipelineCreationCacheControl;
    VkBool32           privateData;
    VkBool32           shaderDemoteToHelperInvocation;
    VkBool32           shaderTerminateInvocation;
    VkBool32           subgroupSizeControl;
    VkBool32           computeFullSubgroups;
    VkBool32           synchronization2;
    VkBool32           textureCompressionASTC_HDR;
    VkBool32           shaderZeroInitializeWorkgroupMemory;
    VkBool32           dynamicRendering;
    VkBool32           shaderIntegerDotProduct;
    VkBool32           maintenance4;
} VkPhysicalDeviceVulkan13Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `robustImageAccess`
enables [Robust Image Access](../../../../spec/latest/chapters/shaders.html#shaders-robust-image-access) guarantees for shader image
accesses.

* 
 `inlineUniformBlock`
indicates whether the implementation supports inline uniform block
descriptors.
If this feature is not enabled,
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) **must** not be used.

* 

`descriptorBindingInlineUniformBlockUpdateAfterBind`
indicates whether the implementation supports updating inline uniform
block descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html).

* 

`pipelineCreationCacheControl` indicates that the implementation
supports:

The following **can** be used in `Vk*PipelineCreateInfo`::`flags`:

[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

The following **can** be used in
[VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)::`flags`:

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html)

 `privateData` indicates
whether the implementation supports private data.
See [Private Data](../../../../spec/latest/chapters/private_data.html#private-data).

`shaderDemoteToHelperInvocation` indicates whether the
implementation supports the SPIR-V `DemoteToHelperInvocationEXT`
capability.

`shaderTerminateInvocation` specifies whether the implementation
supports SPIR-V modules that use the `SPV_KHR_terminate_invocation`
extension.

`subgroupSizeControl` indicates whether the implementation supports
controlling shader subgroup sizes via the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
flag and the [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)
structure.

`computeFullSubgroups` indicates whether the implementation supports
requiring full subgroups in compute
, mesh, or task
shaders via the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) flag.

 `synchronization2`
indicates whether the implementation supports the new set of
synchronization commands introduced in `[VK_KHR_synchronization2](VK_KHR_synchronization2.html)`.

`textureCompressionASTC_HDR` indicates whether all of the ASTC HDR
compressed texture formats are supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](VkFormat.html)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) and
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) **can** be used to check for
supported properties of individual formats as normal.

`shaderZeroInitializeWorkgroupMemory` specifies whether the
implementation supports initializing a variable in Workgroup storage
class.

 `dynamicRendering`
specifies that the implementation supports dynamic render pass instances
using the [vkCmdBeginRendering](vkCmdBeginRendering.html) command.

`shaderIntegerDotProduct` specifies whether shader modules **can**
declare the `DotProductInputAllKHR`, `DotProductInput4x8BitKHR`,
`DotProductInput4x8BitPackedKHR` and `DotProductKHR` capabilities.

 `maintenance4` indicates
that the implementation supports the following:

* 
The application **may** destroy a [VkPipelineLayout](VkPipelineLayout.html) object
immediately after using it to create another object.

* 
`LocalSizeId` **can** be used as an alternative to `LocalSize` to
specify the local workgroup size with specialization constants.

* 
Images created with identical creation parameters will always have the
same alignment requirements.

* 
The size memory requirement of a buffer or image is never greater than
that of another buffer or image created with a greater or equal size.

* 
Push constants do not have to be initialized before they are
dynamically accessed.

* 
The interface matching rules allow a larger output vector to match with
a smaller input vector, with additional values being discarded.

If the `VkPhysicalDeviceVulkan13Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVulkan13Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan13Features-sType-sType) VUID-VkPhysicalDeviceVulkan13Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVulkan13Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
