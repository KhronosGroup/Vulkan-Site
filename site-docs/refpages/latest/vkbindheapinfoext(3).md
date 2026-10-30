# VkBindHeapInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindHeapInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindHeapInfoEXT - Structure describing a device address range and implementation reservation for a descriptor heap

`VkBindHeapInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkBindHeapInfoEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkDeviceAddressRangeEXT    heapRange;
    VkDeviceSize               reservedRangeOffset;
    VkDeviceSize               reservedRangeSize;
} VkBindHeapInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`heapRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) defining the device
address range used for the heap, inclusive of the implementation
reserved range.

* 
`reservedRangeOffset` is the offset within `heapRange` to the
start of the reserved range for the implementation.

* 
`reservedRangeSize` is the size of the reserved range for the
implementation within `heapRange`.

Valid Usage (Implicit)

* 
[](#VUID-VkBindHeapInfoEXT-sType-sType) VUID-VkBindHeapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_HEAP_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkBindHeapInfoEXT-pNext-pNext) VUID-VkBindHeapInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkCmdBindResourceHeapEXT](vkCmdBindResourceHeapEXT.html), [vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkBindHeapInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
