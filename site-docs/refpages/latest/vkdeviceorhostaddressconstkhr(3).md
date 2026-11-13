# VkDeviceOrHostAddressConstKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceOrHostAddressConstKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceOrHostAddressConstKHR - Union specifying a const device or host address

The `VkDeviceOrHostAddressConstKHR` union is defined as:

// Provided by VK_KHR_acceleration_structure, VK_NV_cooperative_vector
typedef union VkDeviceOrHostAddressConstKHR {
    VkDeviceAddress    deviceAddress;
    const void*        hostAddress;
} VkDeviceOrHostAddressConstKHR;

* 
`deviceAddress` is a buffer device address as returned by the
[vkGetBufferDeviceAddressKHR](vkGetBufferDeviceAddress.html) command.

* 
`hostAddress` is a const host memory address.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html), [VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html), [VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html), [VkAccelerationStructureGeometryMotionTrianglesDataNV](VkAccelerationStructureGeometryMotionTrianglesDataNV.html), [VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html), [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), [VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html), [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html), [VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html), [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html), `VkDeviceAddress`, [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkDeviceOrHostAddressConstKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
