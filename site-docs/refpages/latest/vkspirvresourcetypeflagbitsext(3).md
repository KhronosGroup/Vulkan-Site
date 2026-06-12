# VkSpirvResourceTypeFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSpirvResourceTypeFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSpirvResourceTypeFlagBitsEXT - Bitmask specifying different SPIR-V resource declarations

Bits which **can** be set in
[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html)::`resourceMask`, are:

// Provided by VK_EXT_descriptor_heap
typedef enum VkSpirvResourceTypeFlagBitsEXT {
    VK_SPIRV_RESOURCE_TYPE_ALL_EXT = 0x7FFFFFFF,
    VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT = 0x00000001,
    VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT = 0x00000002,
    VK_SPIRV_RESOURCE_TYPE_READ_ONLY_IMAGE_BIT_EXT = 0x00000004,
    VK_SPIRV_RESOURCE_TYPE_READ_WRITE_IMAGE_BIT_EXT = 0x00000008,
    VK_SPIRV_RESOURCE_TYPE_COMBINED_SAMPLED_IMAGE_BIT_EXT = 0x00000010,
    VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT = 0x00000020,
    VK_SPIRV_RESOURCE_TYPE_READ_ONLY_STORAGE_BUFFER_BIT_EXT = 0x00000040,
    VK_SPIRV_RESOURCE_TYPE_READ_WRITE_STORAGE_BUFFER_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT = 0x00000100,
  // Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
    VK_SPIRV_RESOURCE_TYPE_TENSOR_BIT_ARM = 0x00000200,
} VkSpirvResourceTypeFlagBitsEXT;

* 
[VK_SPIRV_RESOURCE_TYPE_ALL_EXT](#) specifies that all resource
declarations are included.

* 
[VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT](#) specifies
`OpTypeSampler` variables.

* 
[VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT](#) specifies
`OpTypeImage` variables with a `Sampled` parameter of 1.

* 
[VK_SPIRV_RESOURCE_TYPE_READ_ONLY_IMAGE_BIT_EXT](#) specifies
`OpTypeImage` variables with a `Sampled` parameter of 2 and
decorated with `NonWritable`.

* 
[VK_SPIRV_RESOURCE_TYPE_READ_WRITE_IMAGE_BIT_EXT](#) specifies
`OpTypeImage` variables with a `Sampled` parameter of 2 and not
decorated with `NonWritable`.

* 
[VK_SPIRV_RESOURCE_TYPE_COMBINED_SAMPLED_IMAGE_BIT_EXT](#) specifies
`OpTypeSampledImage` variables.

* 
[VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT](#) specifies
`OpTypeStruct` variables in the `Uniform` storage class decorated
with `Block`

* 
[VK_SPIRV_RESOURCE_TYPE_READ_ONLY_STORAGE_BUFFER_BIT_EXT](#) specifies
`OpTypeStruct` variables either in the `StorageBuffer` storage
class decorated with `Block` or in the `Uniform` storage class
decorated with `BufferBlock`, and decorated with `NonWritable`

* 
[VK_SPIRV_RESOURCE_TYPE_READ_WRITE_STORAGE_BUFFER_BIT_EXT](#) specifies
`OpTypeStruct` variables either in the `StorageBuffer` storage
class decorated with `Block` or in the `Uniform` storage class
decorated with `BufferBlock`, but not decorated with `NonWritable`

* 
[VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT](#) specifies
`OpTypeAccelerationStructureKHR` variables

* 
[VK_SPIRV_RESOURCE_TYPE_TENSOR_BIT_ARM](#) specifies
`OpTypeTensorARM` variables

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkSpirvResourceTypeFlagsEXT](VkSpirvResourceTypeFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkSpirvResourceTypeFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
