# VkPhysicalDeviceDataGraphOperationSupportARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDataGraphOperationSupportARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDataGraphOperationSupportARM - Structure describing an operation or set of operations supported by a data graph processing engine

The `VkPhysicalDeviceDataGraphOperationSupportARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceDataGraphOperationSupportARM {
    VkPhysicalDeviceDataGraphOperationTypeARM    operationType;
    char                                         name[VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM];
    uint32_t                                     version;
} VkPhysicalDeviceDataGraphOperationSupportARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`operationType` is a [VkPhysicalDeviceDataGraphOperationTypeARM](VkPhysicalDeviceDataGraphOperationTypeARM.html)
enum specifying the type of the operation whose support is being
described.

* 
`name` is a pointer to a null-terminated UTF-8 string specifying the
name of the operation whose support is being described.

* 
`version` is an integer specifying the version of the operation
whose support is being described.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html), [VkPhysicalDeviceDataGraphOperationTypeARM](VkPhysicalDeviceDataGraphOperationTypeARM.html), [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphOperationSupportARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
