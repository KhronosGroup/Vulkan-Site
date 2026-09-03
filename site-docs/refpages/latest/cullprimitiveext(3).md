# CullPrimitiveEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CullPrimitiveEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CullPrimitiveEXT - Application-specified culling state per primitive

`CullPrimitiveEXT`

Decorating a variable with the `CullPrimitiveEXT` built-in decoration
will make that variable contain the culling state of output primitives.
If the per-primitive boolean value is `true`, the primitive will be
culled, if it is `false` it will not be culled.

Valid Usage

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07034) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07034

The `CullPrimitiveEXT` decoration **must** be used only within the
`MeshEXT` `Execution` `Model`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07035) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07035

The variable decorated with `CullPrimitiveEXT` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07036) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07036

`CullPrimitiveEXT` **must** decorate a scalar boolean member of a
structure decorated as `Block`, or decorate a variable of type
`OpTypeArray` of boolean values

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-10589) VUID-CullPrimitiveEXT-CullPrimitiveEXT-10589

If `CullPrimitiveEXT` is declared as an array of boolean values, the
size of the array **must** match the value specified by
`OutputPrimitivesEXT`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-10590) VUID-CullPrimitiveEXT-CullPrimitiveEXT-10590

If `CullPrimitiveEXT` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-10591) VUID-CullPrimitiveEXT-CullPrimitiveEXT-10591

There must be only one declaration of the `CullPrimitiveEXT`
associated with a entry point’s interface

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07038) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07038

The variable decorated with `CullPrimitiveEXT` within the
`MeshEXT` `Execution` `Model` **must** also be decorated with the
`PerPrimitiveEXT` decoration

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
