# VkDeviceOrHostAddressKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceOrHostAddressKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceOrHostAddressKHR - Union specifying a device or host address

The `VkDeviceOrHostAddressKHR` union is defined as:

// Provided by VK_KHR_acceleration_structure, VK_NV_cooperative_vector
typedef union VkDeviceOrHostAddressKHR {
    VkDeviceAddress    deviceAddress;
    void*              hostAddress;
} VkDeviceOrHostAddressKHR;

* 
`deviceAddress` is a buffer device address as returned by the
[vkGetBufferDeviceAddressKHR](vkGetBufferDeviceAddress.html) command.

* 
`hostAddress` is a host memory address.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html), [VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html), [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html), `VkDeviceAddress`, [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkDeviceOrHostAddressKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
