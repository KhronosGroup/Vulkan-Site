# VkAccelerationStructureCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureCreateInfoNV - Structure specifying the parameters of a newly created acceleration structure object

The `VkAccelerationStructureCreateInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkAccelerationStructureCreateInfoNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceSize                     compactedSize;
    VkAccelerationStructureInfoNV    info;
} VkAccelerationStructureCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compactedSize` is the size from the result of
[vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html) if this acceleration
structure is going to be the target of a compacting copy.

* 
`info` is the [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html) structure
specifying further parameters of the created acceleration structure.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-compactedSize-02421) VUID-VkAccelerationStructureCreateInfoNV-compactedSize-02421

If `compactedSize` is not `0` then both `info.geometryCount` and
`info.instanceCount` **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-sType-sType) VUID-VkAccelerationStructureCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-pNext-pNext) VUID-VkAccelerationStructureCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-sType-unique) VUID-VkAccelerationStructureCreateInfoNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-info-parameter) VUID-VkAccelerationStructureCreateInfoNV-info-parameter

 `info` **must** be a valid [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html) structure

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkCreateAccelerationStructureNV](vkCreateAccelerationStructureNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
