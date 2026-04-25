# VkAccelerationStructureCompatibilityKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureCompatibilityKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureCompatibilityKHR - Acceleration structure compatibility

Possible values of `pCompatibility` returned by
[vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html) are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureCompatibilityKHR {
    VK_ACCELERATION_STRUCTURE_COMPATIBILITY_COMPATIBLE_KHR = 0,
    VK_ACCELERATION_STRUCTURE_COMPATIBILITY_INCOMPATIBLE_KHR = 1,
} VkAccelerationStructureCompatibilityKHR;

* 
[VK_ACCELERATION_STRUCTURE_COMPATIBILITY_COMPATIBLE_KHR](#) if the
`pVersionData` version acceleration structure is compatible with
`device`.

* 
[VK_ACCELERATION_STRUCTURE_COMPATIBILITY_INCOMPATIBLE_KHR](#) if the
`pVersionData` version acceleration structure is not compatible with
`device`.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html), [vkGetDeviceMicromapCompatibilityEXT](vkGetDeviceMicromapCompatibilityEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureCompatibilityKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
