# VkFrameBoundaryTensorsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFrameBoundaryTensorsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFrameBoundaryTensorsARM - Add tensor frame boundary information to queue submissions

The `VkFrameBoundaryTensorsARM` structure is defined as:

// Provided by VK_EXT_frame_boundary with VK_ARM_tensors
typedef struct VkFrameBoundaryTensorsARM {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              tensorCount;
    const VkTensorARM*    pTensors;
} VkFrameBoundaryTensorsARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorCount` is the number of tensors that store frame results.

* 
`pTensors` is a pointer to an array of [VkTensorARM](VkTensorARM.html) objects
with tensorCount entries.

Valid Usage (Implicit)

* 
[](#VUID-VkFrameBoundaryTensorsARM-sType-sType) VUID-VkFrameBoundaryTensorsARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAME_BOUNDARY_TENSORS_ARM](VkStructureType.html)

* 
[](#VUID-VkFrameBoundaryTensorsARM-pTensors-parameter) VUID-VkFrameBoundaryTensorsARM-pTensors-parameter

 `pTensors` **must** be a valid pointer to an array of `tensorCount` valid [VkTensorARM](VkTensorARM.html) handles

* 
[](#VUID-VkFrameBoundaryTensorsARM-tensorCount-arraylength) VUID-VkFrameBoundaryTensorsARM-tensorCount-arraylength

 `tensorCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](VkBindSparseInfo.html)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

* 
[VkSubmitInfo](VkSubmitInfo.html)

* 
[VkSubmitInfo2](VkSubmitInfo2.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_frame_boundary](VK_EXT_frame_boundary.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkFrameBoundaryTensorsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
