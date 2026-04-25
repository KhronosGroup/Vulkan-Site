# VkValidationCheckEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationCheckEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationCheckEXT - Specify validation checks to disable

Possible values of elements of the
[VkValidationFlagsEXT](VkValidationFlagsEXT.html)::`pDisabledValidationChecks` array,
specifying validation checks to be disabled, are:

// Provided by VK_EXT_validation_flags
typedef enum VkValidationCheckEXT {
    VK_VALIDATION_CHECK_ALL_EXT = 0,
    VK_VALIDATION_CHECK_SHADERS_EXT = 1,
} VkValidationCheckEXT;

* 
[VK_VALIDATION_CHECK_ALL_EXT](#) specifies that all validation checks
are disabled.

* 
[VK_VALIDATION_CHECK_SHADERS_EXT](#) specifies that shader validation
is disabled.

[VK_EXT_validation_flags](VK_EXT_validation_flags.html), [VkValidationFlagsEXT](VkValidationFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkValidationCheckEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
