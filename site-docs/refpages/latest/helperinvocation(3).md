# HelperInvocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HelperInvocation.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HelperInvocation - Indication of whether a fragment shader is a helper invocation

`HelperInvocation`

Decorating a variable with the `HelperInvocation` built-in decoration
will make that variable contain whether the current invocation is a helper
invocation.
This variable is non-zero if the current fragment being shaded is a helper
invocation and zero otherwise.
A helper invocation is an invocation of the shader that is produced to
satisfy internal requirements such as the generation of derivatives.

|  | It is very likely that a helper invocation will have a value of
| --- | --- |
`SampleMask` fragment shader input value that is zero. |

Valid Usage

* 
[](#VUID-HelperInvocation-HelperInvocation-04239) VUID-HelperInvocation-HelperInvocation-04239

The `HelperInvocation` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-HelperInvocation-HelperInvocation-04240) VUID-HelperInvocation-HelperInvocation-04240

The variable decorated with `HelperInvocation` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HelperInvocation-HelperInvocation-04241) VUID-HelperInvocation-HelperInvocation-04241

The variable decorated with `HelperInvocation` **must** be declared as a
boolean value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
