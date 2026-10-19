# VkConformanceVersion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkConformanceVersion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkConformanceVersion - Structure containing the conformance test suite version the implementation is compliant with

The conformance test suite version an implementation is compliant with is
described with the `VkConformanceVersion` structure:

// Provided by VK_VERSION_1_2
typedef struct VkConformanceVersion {
    uint8_t    major;
    uint8_t    minor;
    uint8_t    subminor;
    uint8_t    patch;
} VkConformanceVersion;

// Provided by VK_KHR_driver_properties
// Equivalent to VkConformanceVersion
typedef VkConformanceVersion VkConformanceVersionKHR;

* 
`major` is the major version number of the conformance test suite.

* 
`minor` is the minor version number of the conformance test suite.

* 
`subminor` is the subminor version number of the conformance test
suite.

* 
`patch` is the patch version number of the conformance test suite.

[VK_KHR_driver_properties](VK_KHR_driver_properties.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkPhysicalDeviceDriverProperties](VkPhysicalDeviceDriverProperties.html), [VkPhysicalDeviceVulkan12Properties](VkPhysicalDeviceVulkan12Properties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkConformanceVersion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
