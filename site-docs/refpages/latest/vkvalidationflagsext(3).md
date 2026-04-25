# VkValidationFlagsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationFlagsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationFlagsEXT - Specify validation checks to disable for a Vulkan instance

When creating a Vulkan instance for which you wish to disable validation
checks, add a [VkValidationFlagsEXT](#) structure to the `pNext` chain
of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure, specifying the checks to be
disabled.

// Provided by VK_EXT_validation_flags
typedef struct VkValidationFlagsEXT {
    VkStructureType                sType;
    const void*                    pNext;
    uint32_t                       disabledValidationCheckCount;
    const VkValidationCheckEXT*    pDisabledValidationChecks;
} VkValidationFlagsEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`disabledValidationCheckCount` is the number of checks to disable.

* 
`pDisabledValidationChecks` is a pointer to an array of
[VkValidationCheckEXT](VkValidationCheckEXT.html) values specifying the validation checks to be
disabled.

Valid Usage (Implicit)

* 
[](#VUID-VkValidationFlagsEXT-sType-sType) VUID-VkValidationFlagsEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VALIDATION_FLAGS_EXT](VkStructureType.html)

* 
[](#VUID-VkValidationFlagsEXT-pDisabledValidationChecks-parameter) VUID-VkValidationFlagsEXT-pDisabledValidationChecks-parameter

 `pDisabledValidationChecks` **must** be a valid pointer to an array of `disabledValidationCheckCount` valid [VkValidationCheckEXT](VkValidationCheckEXT.html) values

* 
[](#VUID-VkValidationFlagsEXT-disabledValidationCheckCount-arraylength) VUID-VkValidationFlagsEXT-disabledValidationCheckCount-arraylength

 `disabledValidationCheckCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

[VK_EXT_validation_flags](VK_EXT_validation_flags.html), [VkStructureType](VkStructureType.html), [VkValidationCheckEXT](VkValidationCheckEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkValidationFlagsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
