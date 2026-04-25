# VkPhysicalDevice16BitStorageFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevice16BitStorageFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevice16BitStorageFeatures - Structure describing features supported by VK_KHR_16bit_storage

The [VkPhysicalDevice16BitStorageFeatures](#) structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDevice16BitStorageFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           storageBuffer16BitAccess;
    VkBool32           uniformAndStorageBuffer16BitAccess;
    VkBool32           storagePushConstant16;
    VkBool32           storageInputOutput16;
} VkPhysicalDevice16BitStorageFeatures;

// Provided by VK_KHR_16bit_storage
// Equivalent to VkPhysicalDevice16BitStorageFeatures
typedef VkPhysicalDevice16BitStorageFeatures VkPhysicalDevice16BitStorageFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

    `storageBuffer16BitAccess` specifies whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 16-bit integer
    and 16-bit floating-point members.
    If this feature is not enabled, 16-bit integer or 16-bit floating-point
    members **must** not be used in such
    objects unless [    `storageBuffer8BitAccess`](#extension-features-storageBuffer8BitAccess) or
    [    `uniformAndStorageBuffer8BitAccess`](#extension-features-uniformAndStorageBuffer8BitAccess) are enabled or they are
    accessed in 32-bit multiples if [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled.
    This also specifies whether shader modules **can** declare the
    `StorageBuffer16BitAccess` capability.

* 

`uniformAndStorageBuffer16BitAccess` specifies whether objects in
the `Uniform` storage class with the `Block` decoration **can** have
16-bit integer and 16-bit floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such
objects unless
[    `uniformAndStorageBuffer8BitAccess`](#extension-features-uniformAndStorageBuffer8BitAccess) are enabled or they are
accessed in 32-bit multiples if [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`UniformAndStorageBuffer16BitAccess` capability.

* 

`storagePushConstant16` specifies whether objects in the
`PushConstant` storage class **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or floating-point members
**must** not be used in such
objects unless [    `storagePushConstant8`](#extension-features-storagePushConstant8) are enabled or they are accessed in 32-bit
multiples if [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`StoragePushConstant16` capability.

* 

`storageInputOutput16` specifies whether objects in the `Input`
and `Output` storage classes **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such objects.
This also specifies whether shader modules **can** declare the
`StorageInputOutput16` capability.

If the `VkPhysicalDevice16BitStorageFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevice16BitStorageFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevice16BitStorageFeatures-sType-sType) VUID-VkPhysicalDevice16BitStorageFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_16bit_storage](VK_KHR_16bit_storage.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevice16BitStorageFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
