# VkPhysicalDeviceVariablePointersFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVariablePointersFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVariablePointersFeatures - Structure describing variable pointers features that can be supported by an implementation

The `VkPhysicalDeviceVariablePointersFeatures` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceVariablePointersFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           variablePointersStorageBuffer;
    VkBool32           variablePointers;
} VkPhysicalDeviceVariablePointersFeatures;

// Provided by VK_VERSION_1_1
// Equivalent to VkPhysicalDeviceVariablePointersFeatures
typedef VkPhysicalDeviceVariablePointersFeatures VkPhysicalDeviceVariablePointerFeatures;

// Provided by VK_KHR_variable_pointers
// Equivalent to VkPhysicalDeviceVariablePointersFeatures
typedef VkPhysicalDeviceVariablePointersFeatures VkPhysicalDeviceVariablePointersFeaturesKHR;

// Provided by VK_KHR_variable_pointers
// Equivalent to VkPhysicalDeviceVariablePointersFeatures
typedef VkPhysicalDeviceVariablePointersFeatures VkPhysicalDeviceVariablePointerFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`variablePointersStorageBuffer` specifies whether the implementation
supports the SPIR-V `VariablePointersStorageBuffer` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_variable_pointers` extension or the
`VariablePointersStorageBuffer` capability.

* 
 `variablePointers`
specifies whether the implementation supports the SPIR-V
`VariablePointers` capability.
When this feature is not enabled, shader modules **must** not declare the
`VariablePointers` capability.

If the `VkPhysicalDeviceVariablePointersFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVariablePointersFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceVariablePointersFeatures-variablePointers-01431) VUID-VkPhysicalDeviceVariablePointersFeatures-variablePointers-01431

If `variablePointers` is enabled then
`variablePointersStorageBuffer` **must** also be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVariablePointersFeatures-sType-sType) VUID-VkPhysicalDeviceVariablePointersFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_variable_pointers](VK_KHR_variable_pointers.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVariablePointersFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
