# VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT - Structure describing cooperative matrix features that can be supported by an implementation

The `VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT` structure
is defined as:

// Provided by VK_EXT_cooperative_matrix_maintenance1
typedef struct VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrixProperties2;
    VkBool32           cooperativeMatrixReductions;
    VkBool32           cooperativeMatrixConversions;
    VkBool32           cooperativeMatrixPerElementOperations;
    VkBool32           cooperativeMatrixGetCoordinate;
} VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixProperties2` indicates that the implementation
supports the [vkGetPhysicalDeviceCooperativeMatrixProperties2EXT](vkGetPhysicalDeviceCooperativeMatrixProperties2EXT.html)
command.

* 

`cooperativeMatrixReductions` indicates that the implementation
supports the `CooperativeMatrixReductionsEXT` SPIR-V capability.
This allows performing (row, column, 2x2, or all element) reductions on
matrices.

* 

`cooperativeMatrixConversions` indicates that the implementation
supports the `CooperativeMatrixConversionsEXT` SPIR-V capability.
This allows converting accumulator matrices to A or B matrices.

* 

`cooperativeMatrixPerElementOperations` indicates that the
implementation supports the
`CooperativeMatrixPerElementOperationsEXT` SPIR-V capability.
This allows performing element-wise operations on matrix elements using
a callback function.

* 

`cooperativeMatrixGetCoordinate` indicates that the implementation
supports the `CooperativeMatrixGetCoordinateEXT` SPIR-V capability.
This allows querying locations for a matrix element.

If the `VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_MAINTENANCE_1_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_cooperative_matrix_maintenance1](VK_EXT_cooperative_matrix_maintenance1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
