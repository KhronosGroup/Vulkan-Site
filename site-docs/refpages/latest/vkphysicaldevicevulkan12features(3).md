# VkPhysicalDeviceVulkan12Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVulkan12Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVulkan12Features - Structure describing the Vulkan 1.2 features that can be supported by an implementation

The `VkPhysicalDeviceVulkan12Features` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkan12Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           samplerMirrorClampToEdge;
    VkBool32           drawIndirectCount;
    VkBool32           storageBuffer8BitAccess;
    VkBool32           uniformAndStorageBuffer8BitAccess;
    VkBool32           storagePushConstant8;
    VkBool32           shaderBufferInt64Atomics;
    VkBool32           shaderSharedInt64Atomics;
    VkBool32           shaderFloat16;
    VkBool32           shaderInt8;
    VkBool32           descriptorIndexing;
    VkBool32           shaderInputAttachmentArrayDynamicIndexing;
    VkBool32           shaderUniformTexelBufferArrayDynamicIndexing;
    VkBool32           shaderStorageTexelBufferArrayDynamicIndexing;
    VkBool32           shaderUniformBufferArrayNonUniformIndexing;
    VkBool32           shaderSampledImageArrayNonUniformIndexing;
    VkBool32           shaderStorageBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageImageArrayNonUniformIndexing;
    VkBool32           shaderInputAttachmentArrayNonUniformIndexing;
    VkBool32           shaderUniformTexelBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageTexelBufferArrayNonUniformIndexing;
    VkBool32           descriptorBindingUniformBufferUpdateAfterBind;
    VkBool32           descriptorBindingSampledImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageBufferUpdateAfterBind;
    VkBool32           descriptorBindingUniformTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingStorageTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingUpdateUnusedWhilePending;
    VkBool32           descriptorBindingPartiallyBound;
    VkBool32           descriptorBindingVariableDescriptorCount;
    VkBool32           runtimeDescriptorArray;
    VkBool32           samplerFilterMinmax;
    VkBool32           scalarBlockLayout;
    VkBool32           imagelessFramebuffer;
    VkBool32           uniformBufferStandardLayout;
    VkBool32           shaderSubgroupExtendedTypes;
    VkBool32           separateDepthStencilLayouts;
    VkBool32           hostQueryReset;
    VkBool32           timelineSemaphore;
    VkBool32           bufferDeviceAddress;
    VkBool32           bufferDeviceAddressCaptureReplay;
    VkBool32           bufferDeviceAddressMultiDevice;
    VkBool32           vulkanMemoryModel;
    VkBool32           vulkanMemoryModelDeviceScope;
    VkBool32           vulkanMemoryModelAvailabilityVisibilityChains;
    VkBool32           shaderOutputViewportIndex;
    VkBool32           shaderOutputLayer;
    VkBool32           subgroupBroadcastDynamicId;
} VkPhysicalDeviceVulkan12Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `samplerMirrorClampToEdge`
indicates whether the implementation supports the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html) sampler address mode.
If this feature is not enabled, the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html) sampler address mode
**must** not be used.

* 
 `drawIndirectCount` indicates whether
the implementation supports the [vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html) and
[vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html) functions.
If this feature is not enabled, these functions **must** not be used.

* 

    `storageBuffer8BitAccess` indicates whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 8-bit integer
    members.
    If this feature is not enabled, 8-bit integer members **must** not be used
    in such
    objects unless [    `shaderUntypedPointer`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
    multiples or 16-bit multiples if
    [    `storageBuffer16BitAccess`](#features-storageBuffer16BitAccess) is enabled.
    This also indicates whether shader modules **can** declare the
    `StorageBuffer8BitAccess` capability.

* 

`uniformAndStorageBuffer8BitAccess` indicates whether objects in the
`Uniform` storage class with the `Block` decoration **can** have
8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects unless [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
multiples or 16-bit multiples if
[    `uniformAndStorageBuffer16BitAccess`](#features-uniformAndStorageBuffer16BitAccess) is enabled.
This also indicates whether shader modules **can** declare the
`UniformAndStorageBuffer8BitAccess` capability.

* 

`storagePushConstant8` indicates whether objects in the
`PushConstant` storage class **can** have 8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects unless [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
multiples or 16-bit multiples if
[    `storagePushConstant16`](#features-storagePushConstant16) is enabled.
This also indicates whether shader modules **can** declare the
`StoragePushConstant8` capability.

* 

`shaderBufferInt64Atomics` indicates whether shaders **can** perform
64-bit unsigned and signed integer atomic operations on buffers.

* 

`shaderSharedInt64Atomics` indicates whether shaders **can** perform
64-bit unsigned and signed integer atomic operations on shared
and payload
memory.

* 
 `shaderFloat16` indicates
whether 16-bit floats (halfs) are supported in shader code.
This also indicates whether shader modules **can** declare the `Float16`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Float16` SPIR-V capability: Declaring and using
16-bit floats in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

* 
 `shaderInt8` indicates
whether 8-bit integers (signed and unsigned) are supported in shader
code.
This also indicates whether shader modules **can** declare the `Int8`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Int8` SPIR-V capability: Declaring and using 8-bit
integers in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

* 
 `descriptorIndexing` indicates
whether the implementation supports the minimum set of descriptor
indexing features as described in the [Feature    Requirements](../../../../spec/latest/chapters/features.html#features-requirements) section.
Enabling this feature when [vkCreateDevice](vkCreateDevice.html) is called does not imply
the other minimum descriptor indexing features are also enabled.
Those other descriptor indexing features **must** be enabled individually
as needed by the application.

* 

`shaderInputAttachmentArrayDynamicIndexing` indicates whether arrays
of input attachments **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayDynamicIndexing` capability.

* 

`shaderUniformTexelBufferArrayDynamicIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayDynamicIndexing` capability.

* 

`shaderStorageTexelBufferArrayDynamicIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayDynamicIndexing` capability.

* 

`shaderUniformBufferArrayNonUniformIndexing` indicates whether
arrays of uniform buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformBufferArrayNonUniformIndexing` capability.

* 

`shaderSampledImageArrayNonUniformIndexing` indicates whether arrays
of samplers or sampled images **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`SampledImageArrayNonUniformIndexing` capability.

* 

`shaderStorageBufferArrayNonUniformIndexing` indicates whether
arrays of storage buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageImageArrayNonUniformIndexing` indicates whether arrays
of storage images **can** be indexed by non-uniform integer expressions in
shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageImageArrayNonUniformIndexing` capability.

* 

`shaderInputAttachmentArrayNonUniformIndexing` indicates whether
arrays of input attachments **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayNonUniformIndexing` capability.

* 

`shaderUniformTexelBufferArrayNonUniformIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageTexelBufferArrayNonUniformIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayNonUniformIndexing` capability.

* 

`descriptorBindingUniformBufferUpdateAfterBind` indicates whether
the implementation supports updating uniform buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingSampledImageUpdateAfterBind` indicates whether the
implementation supports updating sampled image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html).

* 

`descriptorBindingStorageImageUpdateAfterBind` indicates whether the
implementation supports updating storage image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html).

* 

`descriptorBindingStorageBufferUpdateAfterBind` indicates whether
the implementation supports updating storage buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingUniformTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating uniform texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingStorageTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating storage texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html).

* 

`descriptorBindingUpdateUnusedWhilePending` indicates whether the
implementation supports updating descriptors while the set is in use.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](VkDescriptorBindingFlagBits.html) **must** not be
used.

* 

`descriptorBindingPartiallyBound` indicates whether the
implementation supports statically using a descriptor set binding in
which some descriptors are not valid.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used.

* 

`descriptorBindingVariableDescriptorCount` indicates whether the
implementation supports descriptor sets with a variable-sized last
binding.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html) **must** not be
used.

* 

`runtimeDescriptorArray` indicates whether the implementation
supports the SPIR-V `RuntimeDescriptorArray` capability.
If this feature is not enabled, descriptors **must** not be declared in
runtime arrays.

* 
 `samplerFilterMinmax` indicates
whether the implementation supports a minimum set of required formats
supporting min/max filtering as defined by the
[    `filterMinmaxSingleComponentFormats`](../../../../spec/latest/chapters/limits.html#limits-filterMinmaxSingleComponentFormats-minimum-requirements) property minimum
requirements.
If this feature is not enabled, then
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html) **must** only use
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html).

* 
 `scalarBlockLayout`
indicates that the implementation supports the layout of resource blocks
in shaders using [scalar    alignment](../../../../spec/latest/chapters/interfaces.html#interfaces-alignment-requirements).

* 

`imagelessFramebuffer` indicates that the implementation supports
specifying the image view for attachments at render pass begin time via
[VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html).

* 

`uniformBufferStandardLayout` indicates that the implementation
supports the same layouts for uniform buffers as for storage and other
kinds of buffers.
See [Standard Buffer Layout](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-standard-layout).

* 

`shaderSubgroupExtendedTypes` is a boolean specifying whether
subgroup operations can use 8-bit integer, 16-bit integer, 64-bit
integer, 16-bit floating-point, and vectors of these types in
[group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) with
[subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup), if the implementation
supports the types.

* 

`separateDepthStencilLayouts` indicates whether the implementation
supports a `VkImageMemoryBarrier` for a depth/stencil image with
only one of [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) set, and whether
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) can be used.

* 
 `hostQueryReset`
indicates that the implementation supports resetting queries from the
host with [vkResetQueryPool](vkResetQueryPool.html).

* 
 `timelineSemaphore`
indicates whether semaphores created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) are supported.

* 

`bufferDeviceAddress` indicates that the implementation supports
accessing buffer memory in shaders as storage buffers via an address
queried from [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html).

* 

`bufferDeviceAddressCaptureReplay` indicates that the implementation
supports saving and reusing buffer and device addresses, e.g. for trace
capture and replay.

* 

`bufferDeviceAddressMultiDevice` indicates that the implementation
supports the `bufferDeviceAddress`
, `rayTracingPipeline` and `rayQuery` features
for logical devices created with multiple physical devices.
If this feature is not supported, buffer
and acceleration structure
addresses **must** not be queried on a logical device created with more
than one physical device.

* 
 `vulkanMemoryModel`
indicates whether shader modules **can** declare the `VulkanMemoryModel`
capability.

* 

`vulkanMemoryModelDeviceScope` indicates whether the Vulkan Memory
Model can use `Device` scope synchronization.
This also indicates whether shader modules **can** declare the
`VulkanMemoryModelDeviceScope` capability.

* 

`vulkanMemoryModelAvailabilityVisibilityChains` indicates whether
the Vulkan Memory Model can use [    availability and visibility chains](../../../../spec/latest/appendices/memorymodel.html#memory-model-availability-visibility) with more than one element.

* 
 `shaderOutputViewportIndex`
    indicates whether the implementation supports the
    `ShaderViewportIndex` SPIR-V capability enabling variables decorated
    with the `ViewportIndex` built-in to be exported from
mesh,
    vertex or tessellation evaluation shaders.
    If this feature is not enabled, the `ViewportIndex` built-in
    decoration **must** not be used on outputs in
mesh,
    vertex or tessellation evaluation shaders.

* 
 `shaderOutputLayer` indicates whether
    the implementation supports the `ShaderLayer` SPIR-V capability
    enabling variables decorated with the `Layer` built-in to be exported
    from
mesh,
    vertex or tessellation evaluation shaders.
    If this feature is not enabled, the `Layer` built-in decoration **must**
    not be used on outputs in
mesh,
    vertex or tessellation evaluation shaders.

* 
 If
`subgroupBroadcastDynamicId` is [VK_TRUE](VK_TRUE.html), the “Id” operand of
`OpGroupNonUniformBroadcast` **can** be dynamically uniform within a
subgroup, and the “Index” operand of
`OpGroupNonUniformQuadBroadcast` **can** be dynamically uniform within
the derivative group.
If it is [VK_FALSE](VK_FALSE.html), these operands **must** be constants.

If the `VkPhysicalDeviceVulkan12Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVulkan12Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan12Features-sType-sType) VUID-VkPhysicalDeviceVulkan12Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVulkan12Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
