# VkDeviceGroupBindSparseInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupBindSparseInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupBindSparseInfo - Structure indicating which instances are bound

If the `pNext` chain of [VkBindSparseInfo](VkBindSparseInfo.html) includes a
`VkDeviceGroupBindSparseInfo` structure, then that structure includes
device indices specifying which instance of the resources and memory are
bound.

The `VkDeviceGroupBindSparseInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupBindSparseInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           resourceDeviceIndex;
    uint32_t           memoryDeviceIndex;
} VkDeviceGroupBindSparseInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkDeviceGroupBindSparseInfo
typedef VkDeviceGroupBindSparseInfo VkDeviceGroupBindSparseInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`resourceDeviceIndex` is a device index indicating which instance of
the resource is bound.

* 
`memoryDeviceIndex` is a device index indicating which instance of
the memory the resource instance is bound to.

These device indices apply to all buffer and image memory binds included in
the batch pointing to this structure.
The semaphore waits and signals for the batch are executed only by the
physical device specified by the `resourceDeviceIndex`.

If this structure is not present, `resourceDeviceIndex` and
`memoryDeviceIndex` are assumed to be zero.

Valid Usage

* 
[](#VUID-VkDeviceGroupBindSparseInfo-resourceDeviceIndex-01118) VUID-VkDeviceGroupBindSparseInfo-resourceDeviceIndex-01118

`resourceDeviceIndex` and `memoryDeviceIndex` **must** both be
valid device indices

* 
[](#VUID-VkDeviceGroupBindSparseInfo-memoryDeviceIndex-01119) VUID-VkDeviceGroupBindSparseInfo-memoryDeviceIndex-01119

Each memory allocation bound in this batch **must** have allocated an
instance for `memoryDeviceIndex`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupBindSparseInfo-sType-sType) VUID-VkDeviceGroupBindSparseInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](VkBindSparseInfo.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkDeviceGroupBindSparseInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
