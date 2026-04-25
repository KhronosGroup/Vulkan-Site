# VkSubgroupFeatureFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubgroupFeatureFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubgroupFeatureFlagBits - Bitmask describing what group operations are supported with subgroup scope

Bits which **can** be set in
[VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`supportedOperations`
and
[VkPhysicalDeviceVulkan11Properties](VkPhysicalDeviceVulkan11Properties.html)::`subgroupSupportedOperations`
to specify supported [group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) with
[subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup) are:

// Provided by VK_VERSION_1_1
typedef enum VkSubgroupFeatureFlagBits {
    VK_SUBGROUP_FEATURE_BASIC_BIT = 0x00000001,
    VK_SUBGROUP_FEATURE_VOTE_BIT = 0x00000002,
    VK_SUBGROUP_FEATURE_ARITHMETIC_BIT = 0x00000004,
    VK_SUBGROUP_FEATURE_BALLOT_BIT = 0x00000008,
    VK_SUBGROUP_FEATURE_SHUFFLE_BIT = 0x00000010,
    VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT = 0x00000020,
    VK_SUBGROUP_FEATURE_CLUSTERED_BIT = 0x00000040,
    VK_SUBGROUP_FEATURE_QUAD_BIT = 0x00000080,
  // Provided by VK_VERSION_1_4
    VK_SUBGROUP_FEATURE_ROTATE_BIT = 0x00000200,
  // Provided by VK_VERSION_1_4
    VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT = 0x00000400,
  // Provided by VK_EXT_shader_subgroup_partitioned
    VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT = 0x00000100,
  // Provided by VK_NV_shader_subgroup_partitioned
    VK_SUBGROUP_FEATURE_PARTITIONED_BIT_NV = VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT,
  // Provided by VK_KHR_shader_subgroup_rotate
    VK_SUBGROUP_FEATURE_ROTATE_BIT_KHR = VK_SUBGROUP_FEATURE_ROTATE_BIT,
  // Provided by VK_KHR_shader_subgroup_rotate
    VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT_KHR = VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT,
} VkSubgroupFeatureFlagBits;

* 
 [VK_SUBGROUP_FEATURE_BASIC_BIT](#)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniform` capability.

* 
 [VK_SUBGROUP_FEATURE_VOTE_BIT](#) specifies
the device will accept SPIR-V shader modules containing the
`GroupNonUniformVote` capability.

* 

[VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](#) specifies the device will
accept SPIR-V shader modules containing the
`GroupNonUniformArithmetic` capability.

* 
 [VK_SUBGROUP_FEATURE_BALLOT_BIT](#)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformBallot` capability.

* 
 [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](#)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformShuffle` capability.

* 

[VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](#) specifies the device will
accept SPIR-V shader modules containing the
`GroupNonUniformShuffleRelative` capability.

* 
 [VK_SUBGROUP_FEATURE_CLUSTERED_BIT](#)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformClustered` capability.

* 
 [VK_SUBGROUP_FEATURE_QUAD_BIT](#) specifies
the device will accept SPIR-V shader modules containing the
`GroupNonUniformQuad` capability.

* 

[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](#) specifies the device will
accept SPIR-V shader modules containing the
`GroupNonUniformPartitionedEXT` capability.

* 
 [VK_SUBGROUP_FEATURE_ROTATE_BIT](#)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformRotateKHR` capability.

* 

[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](#) specifies the device will
accept SPIR-V shader modules that use the `ClusterSize` operand to
`OpGroupNonUniformRotateKHR`.

[VK_VERSION_1_1](VK_VERSION_1_1.html), [VkSubgroupFeatureFlags](VkSubgroupFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkSubgroupFeatureFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
