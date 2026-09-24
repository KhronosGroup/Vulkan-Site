# VkAccelerationStructureMotionInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMotionInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMotionInfoNV - Structure specifying the parameters of a newly created acceleration structure object

The `VkAccelerationStructureMotionInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureMotionInfoNV {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    maxInstances;
    VkAccelerationStructureMotionInfoFlagsNV    flags;
} VkAccelerationStructureMotionInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxInstances` is the maximum number of instances that **may** be used
in the motion top-level acceleration structure.

* 
`flags` is 0 and reserved for future use.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMotionInfoNV-sType-sType) VUID-VkAccelerationStructureMotionInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MOTION_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureMotionInfoNV-flags-zerobitmask) VUID-VkAccelerationStructureMotionInfoNV-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkAccelerationStructureMotionInfoFlagsNV](VkAccelerationStructureMotionInfoFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureMotionInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
