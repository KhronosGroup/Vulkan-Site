# VkDirectDriverLoadingListLUNARG(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDirectDriverLoadingListLUNARG.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDirectDriverLoadingListLUNARG - Structure specifying additional drivers to load

The `VkDirectDriverLoadingListLUNARG` structure is defined as:

// Provided by VK_LUNARG_direct_driver_loading
typedef struct VkDirectDriverLoadingListLUNARG {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDirectDriverLoadingModeLUNARG           mode;
    uint32_t                                  driverCount;
    const VkDirectDriverLoadingInfoLUNARG*    pDrivers;
} VkDirectDriverLoadingListLUNARG;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` controls the mode in which to load the provided drivers.

* 
`driverCount` is the number of driver manifest paths.

* 
`pDrivers` is a pointer to an array of `driverCount`
[VkDirectDriverLoadingInfoLUNARG](VkDirectDriverLoadingInfoLUNARG.html) structures.

When creating a Vulkan instance for which additional drivers are to be
included, add a `VkDirectDriverLoadingListLUNARG` structure to the pNext
chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure, and include in it the
list of `VkDirectDriverLoadingInfoLUNARG` structures which contain the
information necessary to load additional drivers.

Valid Usage (Implicit)

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-sType-sType) VUID-VkDirectDriverLoadingListLUNARG-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_LIST_LUNARG](VkStructureType.html)

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-mode-parameter) VUID-VkDirectDriverLoadingListLUNARG-mode-parameter

 `mode` **must** be a valid [VkDirectDriverLoadingModeLUNARG](VkDirectDriverLoadingModeLUNARG.html) value

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-pDrivers-parameter) VUID-VkDirectDriverLoadingListLUNARG-pDrivers-parameter

 `pDrivers` **must** be a valid pointer to an array of `driverCount` valid [VkDirectDriverLoadingInfoLUNARG](VkDirectDriverLoadingInfoLUNARG.html) structures

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-driverCount-arraylength) VUID-VkDirectDriverLoadingListLUNARG-driverCount-arraylength

 `driverCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

[VK_LUNARG_direct_driver_loading](VK_LUNARG_direct_driver_loading.html), [VkDirectDriverLoadingInfoLUNARG](VkDirectDriverLoadingInfoLUNARG.html), [VkDirectDriverLoadingModeLUNARG](VkDirectDriverLoadingModeLUNARG.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkDirectDriverLoadingListLUNARG).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
