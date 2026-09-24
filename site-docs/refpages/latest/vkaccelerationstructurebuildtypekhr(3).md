# VkAccelerationStructureBuildTypeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureBuildTypeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureBuildTypeKHR - Acceleration structure build type

Possible values of `buildType` in
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureBuildTypeKHR {
    VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR = 0,
    VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR = 1,
    VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR = 2,
} VkAccelerationStructureBuildTypeKHR;

* 
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR](#) requests the memory
requirement for operations performed by the host.

* 
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR](#) requests the
memory requirement for operations performed by the device.

* 
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](#) requests
the memory requirement for operations performed by either the host, or
the device.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html), [vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureBuildTypeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
