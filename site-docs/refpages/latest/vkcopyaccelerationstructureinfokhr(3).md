# VkCopyAccelerationStructureInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyAccelerationStructureInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyAccelerationStructureInfoKHR - Parameters for copying an acceleration structure

The `VkCopyAccelerationStructureInfoKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkCopyAccelerationStructureInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkAccelerationStructureKHR            src;
    VkAccelerationStructureKHR            dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyAccelerationStructureInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source acceleration structure for the copy.

* 
`dst` is the target acceleration structure for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value
specifying additional operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-mode-03410) VUID-VkCopyAccelerationStructureInfoKHR-mode-03410

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](VkCopyAccelerationStructureModeKHR.html) or
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR](VkCopyAccelerationStructureModeKHR.html)

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-src-04963) VUID-VkCopyAccelerationStructureInfoKHR-src-04963

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-src-03411) VUID-VkCopyAccelerationStructureInfoKHR-src-03411

If `mode` is [VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](VkCopyAccelerationStructureModeKHR.html),
`src` **must** have been constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) in the
build

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-buffer-03718) VUID-VkCopyAccelerationStructureInfoKHR-buffer-03718

The range of `src` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-buffer-03719) VUID-VkCopyAccelerationStructureInfoKHR-buffer-03719

The range of `dst` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-dst-07791) VUID-VkCopyAccelerationStructureInfoKHR-dst-07791

The range of memory backing `dst` that is accessed by this command
**must** not overlap the memory backing `src` that is accessed by this
command

Valid Usage (Implicit)

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-sType-sType) VUID-VkCopyAccelerationStructureInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-pNext-pNext) VUID-VkCopyAccelerationStructureInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-src-parameter) VUID-VkCopyAccelerationStructureInfoKHR-src-parameter

 `src` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-dst-parameter) VUID-VkCopyAccelerationStructureInfoKHR-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-mode-parameter) VUID-VkCopyAccelerationStructureInfoKHR-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-commonparent) VUID-VkCopyAccelerationStructureInfoKHR-commonparent

 Both of `dst`, and `src` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdCopyAccelerationStructureKHR](vkCmdCopyAccelerationStructureKHR.html), [vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkCopyAccelerationStructureInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
