# VkPhysicalDeviceShaderUntypedPointersFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderUntypedPointersFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderUntypedPointersFeaturesKHR - Structure describing support for untyped pointers in shader by an implementation

The `VkPhysicalDeviceShaderUntypedPointersFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_shader_untyped_pointers
typedef struct VkPhysicalDeviceShaderUntypedPointersFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderUntypedPointers;
} VkPhysicalDeviceShaderUntypedPointersFeaturesKHR;

The members of `VkPhysicalDeviceShaderUntypedPointersFeaturesKHR`
describe the following features:

* 
 `shaderUntypedPointers` specifies
whether shader modules **can** declare the `UntypedPointersKHR`
capability and untyped pointers in any
[explicitly laid out storage class](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-layout).

If the `VkPhysicalDeviceShaderUntypedPointersFeaturesKHR` structure is
included in the `pNext` chain of [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), it is
filled with values indicating whether the features are supported.
`VkPhysicalDeviceShaderUntypedPointersFeaturesKHR` **can** also be included
in the `pNext` chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) to enable the features.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderUntypedPointersFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderUntypedPointersFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNTYPED_POINTERS_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_untyped_pointers](VK_KHR_shader_untyped_pointers.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderUntypedPointersFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
