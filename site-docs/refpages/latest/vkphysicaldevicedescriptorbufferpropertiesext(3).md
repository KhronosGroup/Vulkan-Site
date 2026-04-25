# VkPhysicalDeviceDescriptorBufferPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorBufferPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorBufferPropertiesEXT - Structure describing descriptor buffer properties supported by an implementation

The `VkPhysicalDeviceDescriptorBufferPropertiesEXT` structure is defined
as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkPhysicalDeviceDescriptorBufferPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           combinedImageSamplerDescriptorSingleArray;
    VkBool32           bufferlessPushDescriptors;
    VkBool32           allowSamplerImageViewPostSubmitCreation;
    VkDeviceSize       descriptorBufferOffsetAlignment;
    uint32_t           maxDescriptorBufferBindings;
    uint32_t           maxResourceDescriptorBufferBindings;
    uint32_t           maxSamplerDescriptorBufferBindings;
    uint32_t           maxEmbeddedImmutableSamplerBindings;
    uint32_t           maxEmbeddedImmutableSamplers;
    size_t             bufferCaptureReplayDescriptorDataSize;
    size_t             imageCaptureReplayDescriptorDataSize;
    size_t             imageViewCaptureReplayDescriptorDataSize;
    size_t             samplerCaptureReplayDescriptorDataSize;
    size_t             accelerationStructureCaptureReplayDescriptorDataSize;
    size_t             samplerDescriptorSize;
    size_t             combinedImageSamplerDescriptorSize;
    size_t             sampledImageDescriptorSize;
    size_t             storageImageDescriptorSize;
    size_t             uniformTexelBufferDescriptorSize;
    size_t             robustUniformTexelBufferDescriptorSize;
    size_t             storageTexelBufferDescriptorSize;
    size_t             robustStorageTexelBufferDescriptorSize;
    size_t             uniformBufferDescriptorSize;
    size_t             robustUniformBufferDescriptorSize;
    size_t             storageBufferDescriptorSize;
    size_t             robustStorageBufferDescriptorSize;
    size_t             inputAttachmentDescriptorSize;
    size_t             accelerationStructureDescriptorSize;
    VkDeviceSize       maxSamplerDescriptorBufferRange;
    VkDeviceSize       maxResourceDescriptorBufferRange;
    VkDeviceSize       samplerDescriptorBufferAddressSpaceSize;
    VkDeviceSize       resourceDescriptorBufferAddressSpaceSize;
    VkDeviceSize       descriptorBufferAddressSpaceSize;
} VkPhysicalDeviceDescriptorBufferPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`combinedImageSamplerDescriptorSingleArray` indicates that the
implementation does not require an array of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) descriptors to be
written into a descriptor buffer as an array of image descriptors,
immediately followed by an array of sampler descriptors.

* 
 `bufferlessPushDescriptors`
indicates that the implementation does not require a buffer created with
the [VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)
usage flag set to be bound when using push descriptors.

* 

`allowSamplerImageViewPostSubmitCreation` indicates that the
implementation does not restrict when the [VkSampler](VkSampler.html) or
[VkImageView](VkImageView.html) objects used to retrieve descriptor data **can** be
created in relation to command buffer submission.
If this value is [VK_FALSE](VK_FALSE.html), then the application **must** create any
[VkSampler](VkSampler.html) or [VkImageView](VkImageView.html) objects whose descriptor data is
accessed during the execution of a command buffer, before the
[vkQueueSubmit](vkQueueSubmit.html)
, or [vkQueueSubmit2](vkQueueSubmit2.html),
call that submits that command buffer.

* 

`descriptorBufferOffsetAlignment` indicates the **required** alignment
in bytes when setting offsets into the descriptor buffer.

* 
 `maxDescriptorBufferBindings`
indicates the maximum number of descriptor buffer bindings.

* 

`maxResourceDescriptorBufferBindings` indicates the maximum number
of descriptor buffer bindings with
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) that **can** be
used.

* 

`maxSamplerDescriptorBufferBindings` indicates the maximum number of
descriptor buffer bindings with
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) that **can** be
used.

* 

`maxEmbeddedImmutableSamplerBindings` indicates the maximum number
of embedded immutable sampler sets that **can** be bound.

* 

`maxEmbeddedImmutableSamplers` indicates the maximum number of
unique immutable samplers in descriptor set layouts created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html),
and pipeline layouts created from them, which **can** simultaneously exist
on a device.

* 

`bufferCaptureReplayDescriptorDataSize` indicates the maximum size
in bytes of the opaque data used for capture and replay with buffers.

* 

`imageCaptureReplayDescriptorDataSize` indicates the maximum size in
bytes of the opaque data used for capture and replay with images.

* 

`imageViewCaptureReplayDescriptorDataSize` indicates the maximum
size in bytes of the opaque data used for capture and replay with image
views.

* 

`samplerCaptureReplayDescriptorDataSize` indicates the maximum size
in bytes of the opaque data used for capture and replay with samplers.

* 

`accelerationStructureCaptureReplayDescriptorDataSize` indicates the
maximum size in bytes of the opaque data used for capture and replay
with acceleration structures.

* 
 `samplerDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html)
descriptor.

* 

`combinedImageSamplerDescriptorSize` indicates the size in bytes of
a [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) descriptor.

* 
 `sampledImageDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html)
descriptor.

* 
 `storageImageDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html)
descriptor.

* 

`uniformTexelBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) descriptor if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is not
enabled.

* 

`robustUniformTexelBufferDescriptorSize` indicates the size in bytes
of a [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) descriptor if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is
enabled.

* 

`storageTexelBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is not
enabled.

* 

`robustStorageTexelBufferDescriptorSize` indicates the size in bytes
of a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is
enabled.

* 
 `uniformBufferDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html)
descriptor.

* 

`robustUniformBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) descriptor if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is
enabled.

* 
 `storageBufferDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html)
descriptor.

* 

`robustStorageBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) descriptor if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is
enabled.

* 

`inputAttachmentDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) descriptor.

* 

`accelerationStructureDescriptorSize` indicates the size in bytes of
a [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) descriptor.

* 

`maxSamplerDescriptorBufferRange` indicates the maximum range in
bytes from the address of a sampler descriptor buffer binding that is
accessible to a shader.

* 

`maxResourceDescriptorBufferRange` indicates the maximum range in
bytes from the address of a resource descriptor buffer binding that is
accessible to a shader.

* 

`samplerDescriptorBufferAddressSpaceSize` indicates the total size
in bytes of the address space available for descriptor buffers created
with the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage
flag set.

* 

`resourceDescriptorBufferAddressSpaceSize` indicates the total size
in bytes of the address space available for descriptor buffers created
with the [VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage
flag set.

* 

`descriptorBufferAddressSpaceSize` indicates the total size in bytes
of the address space available for descriptor buffers created with both
the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) and
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage flags
set.

A descriptor binding with type [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) has a
descriptor size which is implied by the descriptor types included in the
[VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)::`pDescriptorTypes` list.
The descriptor size is equal to the maximum size of any descriptor type
included in the `pDescriptorTypes` list.

As there is no way to request robust and non-robust descriptors separately,
or specify robust/non-robust descriptors in the set layout, if the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is enabled
then robust descriptors are always used.

If the `VkPhysicalDeviceDescriptorBufferPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), `VkBool32`, `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
