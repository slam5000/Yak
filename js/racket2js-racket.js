var is = (function (a) {
    return ((function (b) {
    return ((is_equal(a, b))); 
})); 
});;

var is_gt = (function (a) {
    return ((function (b) {
    return ((a < b)); 
})); 
});;

var is_gte = (function (a) {
    return ((function (b) {
    return ((a <= b)); 
})); 
});;

var odsl = (Symbol("doesnt-matter"));;

var parse = ((function () {var string_capitalize_word = (function (str) {
    return ((string_append((string_titlecase((substring(str, 0, 1)))), (substring(str, 1))))); 
});; 
    var is_in_string = (function (str) {
    return ((function (matched) {
    return ((matches(matched, str))); 
})); 
});; 
    var is_in_list = (function (xs) {
    return ((function (c) {
    return ((0 < (count((function (e) {
    return ((is_equal(e, c))); 
}), xs)))); 
})); 
});; 
    var partial_flatten = (function (xs) {
    return (((false !== ((is_empty(xs)))) ? (xs) : ((append((car(xs)), (partial_flatten((cdr(xs))))))))); 
});; 
    var substring_no_max = (function (str) { 
    var indexes = Array.prototype.slice.call(arguments, 1); 
    
    return (((false !== (((string_length(str)) < (car(indexes))))) ? ("") : (((false !== (((not((is_empty((cdr(indexes)))))) && ((string_length(str)) < (cadr(indexes)))))) ? ((substring_no_max(str, (car(indexes))))) : ((apply(substring, (cons(str, indexes))))))))); 
});; 
    var assert = (function (check, message) {
    return (((false !== (check)) ? ((Symbol("ok"))) : ((raise(message))))); 
});; 
    var parens_to_spaces = (function (str) {
    return ((string_replace((string_replace(str, ")", " ")), "(", " "))); 
});; 
    var no_indent = (function (x) {
    return ((x === 0)); 
});; 
    var base_indent = (function (x) {
    return ((0 <= x)); 
});; 
    var any_indent = (function (_) {
    return (true); 
});; 
    var tokenize = (function () { 
    var args = Array.prototype.slice.call(arguments, 0); 
    
    return ((apply(list, (cons((string_to_symbol((string_append((string_append("Token-")), (string_downcase((symbol_to_string((car(args)))))))))), (cdr(args))))))); 
});; 
    var token_contents = (function (token, f) {
    return ((apply(f, (cdr(token))))); 
});; 
    var parse_white = (function (str, _) {
    return ((parse_all_like((is(" ")), str, no_indent))); 
});; 
    var parse_white_line = (function (str, indent) {
    return ((given((parse_all_like((is(" ")), str, no_indent)), (function (spaces, str) {
    return ((given((parse_characters("\n", str, no_indent)), (function (newline, str) {
    return ((possibility((string_append(spaces, newline)), str))); 
})))); 
})))); 
});; 
    var parse_characters = (function (to_parse, str, _) {
    return (((false !== ((is_equal(to_parse, (substring_no_max(str, 0, (string_length(to_parse)))))))) ? ((possibility(to_parse, (substring(str, (string_length(to_parse))))))) : ((impossibility())))); 
});; 
    var parse_n_like = (function (n, check, str, _) {
    return (((false !== ((n === 0))) ? ((possibility("", str))) : (((false !== (((is_equal(str, "")) || (not((check((substring(str, 0, 1))))))))) ? ((impossibility())) : ((given((parse_n_like((n - 1), check, (substring(str, 1)), no_indent)), (function (rest, unparsed_str) {
    return ((possibility((string_append((substring(str, 0, 1)), rest)), unparsed_str))); 
})))))))); 
});; 
    var parse_all_like = (function (check, str, _) {
    return (((false !== (((is_equal(str, "")) || (not((check((substring(str, 0, 1))))))))) ? ((possibility("", str))) : ((given((parse_all_like(check, (substring_no_max(str, 1)), no_indent)), (function (rest, unparsed_str) {
    return ((possibility((string_append((substring(str, 0, 1)), rest)), unparsed_str))); 
})))))); 
});; 
    var parse_all_at_least_one_like = (function (check, str, _) {
    return ((given((parse_all_like(check, str, no_indent)), (function (maybe_result, str) {
    return (((false !== ((0 < (string_length(maybe_result))))) ? ((possibility(maybe_result, str))) : ((impossibility())))); 
})))); 
});; 
    var parse_separated = (function (separator, separated, str, indent) {var parse_separated = (function (result, str) {
    return (((false !== ((is_possible((separated(str, indent)))))) ? ((given((separated(str, indent)), (function (e, str) {
    return ((parse_separator((append(result, (list(e)))), str))); 
})))) : ((possibility(result, str))))); 
});; 
    var parse_separator = (function (result, str) {
    return (((false !== ((is_possible((separator(str, indent)))))) ? ((given((separator(str, indent)), (function (_, str) {
    return ((parse_separated(result, str))); 
})))) : ((possibility(result, str))))); 
});;
    return ((parse_separated(([]), str))); 
});; 
    var parse_each = (function (proc, str, indent) {var possibilities = (proc(str, indent));;
    return (((false !== ((not((is_possible(possibilities)))))) ? ((possibility(([]), str))) : ((given(possibilities, (function (exp, str) {
    return ((given((parse_each(proc, str, indent)), (function (exps, str) {
    return ((possibility((cons(exp, exps)), str))); 
})))); 
})))))); 
});; 
    var parse_exps = (function (str, indent) {
    return ((given((parse_all_like((is_in_string(" \n")), str, no_indent)), (function (_, str) {
    return ((given((parse_separated((function (str, indent) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("\n", str, no_indent))); 
}), (function (str) {
    return ((parse_all_like((function (str) {
    return ((is_possible((parse_white_line(str, indent))))); 
}), str, no_indent))); 
})))); 
}), parse_exp, str, indent)), (function (exps, str) {
    return ((given((parse_all_like((is_in_string(" \n")), str, no_indent)), (function (_, str) {
    return (((false !== ((is_equal(str, "")))) ? ((possibility(exps, ""))) : ((impossibility())))); 
})))); 
})))); 
})))); 
});; 
    var parse_exp = (function (str, indent) {
    return ((given((parse_n_like(1, (function (c) {
    return (true); 
}), str, no_indent)), (function (_, __) {
    return ((also((given_seq((parse_characters("(", str, no_indent)), (function (str) {
    return ((given((parse_exp(str, indent)), (function (exp, str) {
    return ((given_seq((parse_characters(")", str, no_indent)), (function (str) {
    return ((possibility(exp, str))); 
})))); 
})))); 
}))), (parse_not_beginning_with_exp(str, indent)), (parse_beginning_with_exp(str, indent))))); 
})))); 
});; 
    var parse_exp_not_naked_compound = (function (str, indent) {
    return ((also((given_seq((parse_characters("(", str, no_indent)), (function (str) {
    return ((given((parse_exp(str, indent)), (function (exp, str) {
    return ((given_seq((parse_characters(")", str, no_indent)), (function (str) {
    return ((possibility(exp, str))); 
})))); 
})))); 
}))), (parse_not_beginning_with_exp(str, indent))))); 
});; 
    var also_within_naked_compound = (function (possi, str, indent) {
    return ((also((parse_associating_left_beginning_with_exp_with((stream_first((stream_first(possi)))), str, indent)), possi))); 
});; 
    var parse_not_beginning_with_exp = (function (str, indent) {
    return ((also((parse_number(str, indent)), (parse_string(str, indent)), (parse_boolean(str, indent)), (parse_nil(str, indent)), (parse_dot(str, indent)), (parse_unknown(str, indent)), (parse_identifier(str, indent)), (parse_parameter(str, indent)), (parse_list_literal(str, indent)), (parse_funject_literal(str, indent)), (parse_strict_assignment(str, indent)), (parse_lazy_assignment(str, indent)), (parse_reset_strict_assignment(str, indent)), (parse_reset_lazy_assignment(str, indent))))); 
});; 
    var parse_beginning_with_exp = (function (str, indent) {
    return ((also((parse_funject_strict_assignment(str, indent)), (parse_funject_lazy_assignment(str, indent)), (parse_invocation(str, indent)), (parse_funject_inheritance(str, indent)), (parse_inverse_definition(str, indent))))); 
});; 
    var parse_associating_left_beginning_with_exp_with = (function (first, str, indent) {
    return ((also((parse_invocation_with(first, str, indent))))); 
});; 
    var parse_number = (function (str, indent) {var is_digit = (function (c) {
    return (((is_equal(c, "0")) || (is_equal(c, "1")) || (is_equal(c, "2")) || (is_equal(c, "3")) || (is_equal(c, "4")) || (is_equal(c, "5")) || (is_equal(c, "6")) || (is_equal(c, "7")) || (is_equal(c, "8")) || (is_equal(c, "9")))); 
});; 
    var possibility_if_number = (function (nstr, str) {
    return (((false !== ((string_to_number(nstr)))) ? ((possibility((tokenize((Symbol("Number")), (string_to_number(nstr)))), str))) : (empty))); 
});; 
    var with_e_notation = (function (nstr, str) {var digits_after_e = (function (nstr, str) {
    return ((given((parse_all_at_least_one_like(is_digit, str, no_indent)), (function (digits, str) {
    return ((possibility_if_number((string_append(nstr, digits)), str))); 
})))); 
});;
    return ((given((parse_n_like(1, (function (c) {
    return (((is_equal(c, "e")) || (is_equal(c, "E")))); 
}), str, no_indent)), (function (e, str) {
    return ((also((digits_after_e((string_append(nstr, e)), str)), (given((parse_n_like(1, (function (c) {
    return (((is_equal(c, "+")) || (is_equal(c, "-")))); 
}), str, no_indent)), (function (e_sign, str) {
    return ((digits_after_e((string_append(nstr, e, e_sign)), str))); 
})))))); 
})))); 
});; 
    var after_initial_sign = (function (sign, str) {
    return ((given((parse_all_at_least_one_like(is_digit, str, no_indent)), (function (first_digits, str) {
    return ((also((possibility_if_number((string_append(sign, first_digits)), str)), (with_e_notation((string_append(sign, first_digits)), str)), (given((parse_characters(".", str, no_indent)), (function (spot, str) {
    return ((given((parse_all_at_least_one_like(is_digit, str, no_indent)), (function (rest_digits, str) {
    return ((also((possibility_if_number((string_append(sign, first_digits, spot, rest_digits)), str)), (with_e_notation((string_append(sign, first_digits, spot, rest_digits)), str))))); 
})))); 
})))))); 
})))); 
});;
    return ((also((after_initial_sign("", str)), (given((parse_characters("-", str, no_indent)), after_initial_sign))))); 
});; 
    var parse_string = (function (str, indent) {var unescape = (function (str) {
    return ((string_replace("\\n", "\n", (string_replace("\\\"", "\"", (string_replace("\\'", "'", str))))))); 
});; 
    var parse_string_contents = (function (delim, str) {var iter = (function (str) {
    return ((also((given((parse_characters(delim, str, no_indent)), (function (_, __) {
    return ((possibility("", str))); 
}))), (given((parse_all_at_least_one_like((function (c) {
    return ((not(((is_equal(c, delim)) || (is_equal(c, "\\")) || (is_equal(c, "\n")))))); 
}), str, no_indent)), (function (first, str) {
    return ((given((iter(str)), (function (second, str) {
    return ((possibility((string_append(first, second)), str))); 
})))); 
}))), (given((parse_characters("\\", str, no_indent)), (function (_, str) {
    return ((given((parse_n_like(1, (function (c) {
    return (((is_equal(c, "n")) || (is_equal(c, "\\")) || (is_equal(c, "\"")) || (is_equal(c, "'")))); 
}), str, no_indent)), (function (c, str) {
    return ((given((iter(str)), (function (contents, str) {
    return ((possibility((string_append("\\", c, contents)), str))); 
})))); 
})))); 
}))), (given((parse_characters("\n", str, no_indent)), (function (_, str) {
    return ((given((parse_all_like((is_in_string(" ")), str, no_indent)), (function (spaces, str) {var indentation = (least_acceptable_indent(indent, (string_length(spaces))));;
    return (((false !== (indentation)) ? ((iter((substring(str, (string_length(indentation))))))) : ((impossibility())))); 
})))); 
})))))); 
});;
    return ((iter(str))); 
});; 
    var with_delimiter = (function (delim) {
    return ((given((parse_characters(delim, str, no_indent)), (function (_, str) {
    return ((given((parse_string_contents(delim, str)), (function (contents, str) {
    return ((given((parse_characters(delim, str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("String")), contents)), str))); 
})))); 
})))); 
})))); 
});;
    return ((also((with_delimiter("\"")), (with_delimiter("'"))))); 
});; 
    var parse_boolean = (function (str, indent) {
    return ((given((also((parse_characters("true", str, no_indent)), (parse_characters("false", str, no_indent)))), (function (bool, str) {
    return (((false !== ((is_equal(bool, "true")))) ? ((possibility((tokenize((Symbol("Boolean")), true)), str))) : (((false !== ((is_equal(bool, "false")))) ? ((possibility((tokenize((Symbol("Boolean")), false)), str))) : ((raise("parse-boolean: Syntax Error"))))))); 
})))); 
});; 
    var parse_nil = (function (str, indent) {
    return ((given((parse_characters("nil", str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("Nil")))), str))); 
})))); 
});; 
    var parse_dot = (function (str, indent) {
    return ((given((parse_characters("dot", str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("Dot")))), str))); 
})))); 
});; 
    var parse_unknown = (function (str, indent) {
    return ((given((parse_characters("unknown", str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("Unknown")))), str))); 
})))); 
});; 
    var numbers = "1234567890";; 
    var legal_variable_characters = "-+*/%_$<>0QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";; 
    var numbers_and_legal_variable_characters = (string_append(numbers, legal_variable_characters));; 
    var parse_identifier = (function (str, indent) {
    return ((given((also((given((parse_n_like(1, (is_in_string(legal_variable_characters)), str, no_indent)), (function (name, str) {
    return (((false !== ((is_impossible((parse_n_like(1, (is_in_string(numbers_and_legal_variable_characters)), str, no_indent)))))) ? ((possibility(name, str))) : ((impossibility())))); 
}))), (given((parse_n_like(1, (is_in_string(numbers_and_legal_variable_characters)), str, no_indent)), (function (first, str) {
    return ((given((parse_all_at_least_one_like((is_in_string(numbers_and_legal_variable_characters)), str, no_indent)), (function (rest, str) {
    return ((possibility((string_append(first, rest)), str))); 
})))); 
}))))), (function (name, str) {
    return ((possibility((tokenize((Symbol("Identifier")), name)), str))); 
})))); 
});; 
    var parse_parameter = (function (str, indent) {
    return ((given_seq((parse_characters("@", str, no_indent)), (function (str) {
    return ((given((parse_identifier(str, no_indent)), (function (name, str) {
    return ((possibility((tokenize((Symbol("Parameter")), (string_append("@", (cadr(name)))))), str))); 
})))); 
})))); 
});; 
    var parse_funject_literal = (function (str, indent) {
    return ((given((parse_characters("{", str, no_indent)), (function (_, str) {
    return ((also((given((parse_white(str, no_indent)), (function (_, str) {
    return ((given((parse_characters("}", str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("Funject-literal")), ([]))), str))); 
})))); 
}))), (given((parse_white(str, no_indent)), (function (_, str) {
    return ((given((parse_exp(str, indent)), (function (key, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters(":", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_sequence(str, indent)), (function (value, str) {
    return ((given((parse_all_like((function (c) {
    return (((is_equal(c, " ")) || (is_equal(c, "\n")))); 
}), str, no_indent)), (function (_, str) {
    return ((given((parse_characters("}", str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("Funject-literal")), (list((list(key, value)))))), str))); 
})))); 
})))); 
})))); 
})))); 
})))); 
}))), (given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("\n", str, no_indent))); 
}), (function (str) {
    return ((parse_each(parse_white_line, str, no_indent))); 
}), (function (str) {
    return ((also((given_seq((parse_white(str, indent)), (function (str) {
    return ((parse_characters("}", str, no_indent))); 
}), (function (str) {
    return ((possibility((tokenize((Symbol("Funject")), empty)), str))); 
}))), (given((parse_white(str, no_indent)), (function (spaces, _) {var indentation = (string_length(spaces));; 
    ((false !== ((indent(indentation)))) ? (([])) : ((raise("parse-funject-literal: Synatx Error: you must indent the arguments of a multiline funject literal more than the normal indentation level!"))));
    return ((given((parse_each((function (str, indent) {
    return ((given_seq((parse_each(parse_white_line, str, indent)), (function (str) {
    return ((parse_characters(spaces, str, no_indent))); 
}), (function (str) {
    return ((given((parse_exp(str, indent)), (function (key, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters(":", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_sequence(str, (function (ind) {
    return ((indentation < ind)); 
}))), (function (value, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("\n", str, no_indent))); 
}), (function (str) {
    return ((possibility((list(key, value)), str))); 
})))); 
})))); 
})))); 
})))); 
})))); 
}), str, indent)), (function (pairs, str) {
    return ((given_seq((parse_each(parse_white_line, str, indent)), (function (str) {
    return ((given((parse_all_like((is(" ")), str, no_indent)), (function (spaces, str) {
    return (((false !== ((not((indent((string_length(spaces)))))))) ? ((impossibility())) : ((given_seq((parse_characters("}", str, no_indent)), (function (str) {
    return ((possibility((tokenize((Symbol("Funject-literal")), pairs)), str))); 
})))))); 
})))); 
})))); 
})))); 
})))))); 
})))))); 
})))); 
});; 
    var parse_list_literal = (function (str, indent) {
    return ((given((parse_characters("[", str, no_indent)), (function (_, str) {
    return ((given((parse_separated((function (str, _) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters(",", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
})))); 
}), parse_exp, str, indent)), (function (elems, str) {
    return ((given((parse_characters("]", str, no_indent)), (function (_, str) {
    return ((possibility((tokenize((Symbol("List-literal")), elems)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_sequence = (function (str, indent) {
    return ((also((given((parse_exp(str, indent)), (function (exp, str) {
    return ((possibility((tokenize((Symbol("Sequence")), (list(exp)))), str))); 
}))), (given_seq((parse_white(str, no_indent)), (function (measure_str) {
    return ((parse_characters("\n", str, no_indent))); 
}), (function (measure_str) {
    return ((given((parse_all_like((is(" ")), measure_str, no_indent)), (function (spaces, measure_str) {var indentation = (string_length(spaces));; 
    ((false !== ((indent(indentation)))) ? (([])) : ((raise("parse-sequence: you must indent a series of statements farther than its enclosing syntactic block!")))); 
    var parse_white_newline_indent = (function (str, indent) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("\n", str, no_indent))); 
}), (function (str) {
    return ((parse_each(parse_white_line, str, base_indent))); 
}), (function (str) {
    return ((parse_characters(spaces, str, no_indent))); 
})))); 
});;
    return ((given_seq((parse_white_newline_indent(str, indent)), (function (str) {
    return ((given((parse_separated(parse_white_newline_indent, parse_exp, str, (is_gte(indentation)))), (function (exps, str) {
    return ((possibility((tokenize((Symbol("Sequence")), exps)), str))); 
})))); 
})))); 
})))); 
})))))); 
});; 
    var parse_strict_assignment = (function (str, indent) {
    return ((given((parse_identifier(str, no_indent)), (function (left, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("=", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_exp(str, indent)), (function (right, str) {
    return ((possibility((tokenize((Symbol("Strict-assignment")), left, right)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_lazy_assignment = (function (str, indent) {
    return ((given((parse_identifier(str, no_indent)), (function (left, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters(":=", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_sequence(str, indent)), (function (right, str) {
    return ((possibility((tokenize((Symbol("Lazy-assignment")), left, right)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_funject_strict_assignment = (function (str, indent) {
    return ((given((parse_invocation(str, indent)), (function (left, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("=", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_exp(str, indent)), (function (right, str) {
    return ((possibility((tokenize((Symbol("Funject-strict-assignment")), left, right)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_funject_lazy_assignment = (function (str, indent) {
    return ((given((parse_invocation(str, indent)), (function (left, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters(":=", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_sequence(str, indent)), (function (right, str) {
    return ((possibility((tokenize((Symbol("Funject-lazy-assignment")), left, right)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_reset_strict_assignment = (function (str, indent) {
    return ((given((parse_identifier(str, no_indent)), (function (left, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("|=", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_exp(str, indent)), (function (right, str) {
    return ((possibility((tokenize((Symbol("Reset-strict-assignment")), left, right)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_reset_lazy_assignment = (function (str, indent) {
    return ((given((parse_identifier(str, no_indent)), (function (left, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("|:=", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_sequence(str, indent)), (function (right, str) {
    return ((possibility((tokenize((Symbol("Reset-lazy-assignment")), left, right)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_invocation = (function (str, indent) {
    return ((given((parse_exp_not_naked_compound(str, indent)), (function (receiver, str) {
    return ((parse_invocation_with(receiver, str, indent))); 
})))); 
});; 
    var parse_invocation_with = (function (receiver, str, indent) {
    return ((also((given((parse_white(str, no_indent)), (function (_, str) {
    return ((given((parse_exp(str, indent)), (function (args, str) {
    return ((also_within_naked_compound((possibility((tokenize((Symbol("Invocation")), receiver, args)), str)), str, indent))); 
})))); 
}))), (given((parse_characters(".", str, no_indent)), (function (_, str) {
    return ((given((parse_identifier(str, no_indent)), (function (property_token, str) {
    return ((token_contents(property_token, (function (property) {
    return ((also_within_naked_compound((possibility((tokenize((Symbol("Invocation")), receiver, (tokenize((Symbol("List-literal")), (list((tokenize((Symbol("Dot")))), (tokenize((Symbol("String")), property)))))))), str)), str, indent))); 
})))); 
})))); 
})))))); 
});; 
    var parse_funject_inheritance = (function (str, indent) {
    return ((given((parse_exp_not_naked_compound(str, indent)), (function (heir, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("<<", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_exp(str, indent)), (function (inherited, str) {
    return ((possibility((tokenize((Symbol("Funject-inheritance")), heir, inherited)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse_inverse_definition = (function (str, indent) {
    return ((given((parse_exp_not_naked_compound(str, indent)), (function (f, str) {
    return ((given_seq((parse_white(str, no_indent)), (function (str) {
    return ((parse_characters("<-", str, no_indent))); 
}), (function (str) {
    return ((parse_white(str, no_indent))); 
}), (function (str) {
    return ((given((parse_exp(str, indent)), (function (f_inverse, str) {
    return ((possibility((tokenize((Symbol("Inverse-definition")), f, f_inverse)), str))); 
})))); 
})))); 
})))); 
});; 
    var parse = (function (str) {
    return ((parse_exps(str, base_indent))); 
});;
    return (parse); 
})());;

var mcadr = (compose(mcar, mcdr));;

var mcaddr = (compose(mcar, mcdr, mcdr));;

var mcadddr = (compose(mcar, mcdr, mcdr, mcdr));;

var mcaddddr = (compose(mcar, mcdr, mcdr, mcdr, mcdr));;

var mcadddddr = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaddddddr = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcadddddddr = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaddddddddr = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaadr = (compose(mcar, mcar, mcdr));;

var mcaaddr = (compose(mcar, mcar, mcdr, mcdr));;

var mcaadddr = (compose(mcar, mcar, mcdr, mcdr, mcdr));;

var mcaaddddr = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr));;

var mcaadddddr = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaaddddddr = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaadddddddr = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaaddddddddr = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcaar = (compose(mcar, mcar));;

var mcadar = (compose(mcar, mcdr, mcar));;

var mcaddar = (compose(mcar, mcdr, mcdr, mcar));;

var mcadddar = (compose(mcar, mcdr, mcdr, mcdr, mcar));;

var mcaddddar = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcadddddar = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaddddddar = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcadddddddar = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaddddddddar = (compose(mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaadar = (compose(mcar, mcar, mcdr, mcar));;

var mcaaddar = (compose(mcar, mcar, mcdr, mcdr, mcar));;

var mcaadddar = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcar));;

var mcaaddddar = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaadddddar = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaaddddddar = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaadddddddar = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcaaddddddddar = (compose(mcar, mcar, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcddr = (compose(mcdr, mcdr));;

var mcdddr = (compose(mcdr, mcdr, mcdr));;

var mcddddr = (compose(mcdr, mcdr, mcdr, mcdr));;

var mcdddddr = (compose(mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcddddddr = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcdddddddr = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcddddddddr = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr));;

var mcdar = (compose(mcdr, mcar));;

var mcddar = (compose(mcdr, mcdr, mcar));;

var mcdddar = (compose(mcdr, mcdr, mcdr, mcar));;

var mcddddar = (compose(mcdr, mcdr, mcdr, mcdr, mcar));;

var mcdddddar = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcddddddar = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcdddddddar = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcddddddddar = (compose(mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcdr, mcar));;

var mcadaadr = (compose(mcar, mcdr, mcar, mcar, mcdr));;

var set_mcadr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdr(xs)), x))); 
});;

var set_mcaddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddr(xs)), x))); 
});;

var set_mcadddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdddr(xs)), x))); 
});;

var set_mcaddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddddr(xs)), x))); 
});;

var set_mcadddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdddddr(xs)), x))); 
});;

var set_mcaddddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddddddr(xs)), x))); 
});;

var set_mcadddddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdddddddr(xs)), x))); 
});;

var set_mcaddddddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddddddddr(xs)), x))); 
});;

var set_mcaadr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadr(xs)), x))); 
});;

var set_mcaaddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddr(xs)), x))); 
});;

var set_mcaadddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadddr(xs)), x))); 
});;

var set_mcaaddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddddr(xs)), x))); 
});;

var set_mcaadddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadddddr(xs)), x))); 
});;

var set_mcaaddddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddddddr(xs)), x))); 
});;

var set_mcaadddddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadddddddr(xs)), x))); 
});;

var set_mcaaddddddddr_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddddddddr(xs)), x))); 
});;

var set_mcadar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdar(xs)), x))); 
});;

var set_mcaddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddar(xs)), x))); 
});;

var set_mcadddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdddar(xs)), x))); 
});;

var set_mcaddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddddar(xs)), x))); 
});;

var set_mcadddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdddddar(xs)), x))); 
});;

var set_mcaddddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddddddar(xs)), x))); 
});;

var set_mcadddddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcdddddddar(xs)), x))); 
});;

var set_mcaddddddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcddddddddar(xs)), x))); 
});;

var set_mcaadar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadar(xs)), x))); 
});;

var set_mcaaddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddar(xs)), x))); 
});;

var set_mcaadddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadddar(xs)), x))); 
});;

var set_mcaaddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddddar(xs)), x))); 
});;

var set_mcaadddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadddddar(xs)), x))); 
});;

var set_mcaaddddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddddddar(xs)), x))); 
});;

var set_mcaadddddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcadddddddar(xs)), x))); 
});;

var set_mcaaddddddddar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcar_racket_exclamation_point((mcaddddddddar(xs)), x))); 
});;

var set_mcdar_racket_exclamation_point = (function (xs, x) {
    return ((set_mcdr_racket_exclamation_point((mcar(xs)), x))); 
});;

var mlast = (function (xs) {
    return (((false !== ((is_empty((mcdr(xs)))))) ? ((mcar(xs))) : ((mlast((mcdr(xs))))))); 
});;

var mcopy = (function (xs) {
    return (((false !== ((is_empty(xs)))) ? (([])) : ((mcons((mcar(xs)), (mcopy((mcdr(xs))))))))); 
});;

var partial = (function (f) { 
    var args = Array.prototype.slice.call(arguments, 1); 
    var result = (function () { 
    var more_args = Array.prototype.slice.call(arguments, 0); 
    
    return ((apply(f, (append(args, more_args))))); 
});;
    return (result); 
});;

var contents = (function (xs, f) {
    return ((apply(f, xs))); 
});;

var mlist_contents = (function (xs, f) {
    return ((apply(f, (mlist_to_list(xs))))); 
});;

var is_tagged_list = (function (sym, exp) {
    return ((is_equal(sym, (mcar(exp))))); 
});;

var create_env_pair = mlist;;

var env_pair_count = mlength;;

var env_pair_key_of = mcar;;

var env_pair_value_of = mcadr;;

var env_pairs = mlist;;

var create_env_pair_strict = (function (name, val) {
    return ((create_env_pair(name, (bind_as_though_sequence(val))))); 
});;

var empty_env = (Symbol("empty-env"));;

var is_env_empty = (partial(is_eq, (Symbol("empty-env"))));;

var env_create = (function (pairs) { 
    var maybe_parent = Array.prototype.slice.call(arguments, 1); 
    
    return ((mlist((Symbol("env")), pairs, empty_env))); 
});;

var env_extend = (function (pairs, env) {
    return ((mlist((Symbol("env")), pairs, env))); 
});;

var env_extend_one = (function (key_value, env) {
    return ((mlist((Symbol("env")), (env_pairs(key_value)), env))); 
});;

var env_pairs_of = mcadr;;

var env_parent_of = mcaddr;;

var is_env_has = (function (name, env) {var iter = (function (ps) {
    return (((false !== ((is_empty(ps)))) ? ((is_env_has(name, (env_parent_of(env))))) : (((false !== ((is_equal(name, (env_pair_key_of((mcar(ps)))))))) ? (true) : ((iter((mcdr(ps))))))))); 
});;
    return (((false !== ((is_env_empty(env)))) ? (false) : ((iter((mcadr(env))))))); 
});;

var env_get = (function (name, env) {var iter = (function (ps) {
    return (((false !== ((is_empty(ps)))) ? (((false !== ((is_env_empty((env_parent_of(env)))))) ? ((user_error_cannot_find_variable(name))) : ((env_get(name, (env_parent_of(env))))))) : (((false !== ((is_equal(name, (env_pair_key_of((mcar(ps)))))))) ? ((env_pair_value_of((mcar(ps))))) : ((iter((mcdr(ps))))))))); 
});;
    return ((iter((mcadr(env))))); 
});;

var env_set_racket_exclamation_point = (function (key, value, env) {var iter = (function (ps) {
    return (((false !== ((is_empty(ps)))) ? ((set_mcadr_racket_exclamation_point(env, (mcons((create_env_pair(key, value)), (mcadr(env)))))), env) : (((false !== ((is_equal(key, (mcaar(ps)))))) ? ((set_mcdar_racket_exclamation_point(ps, value)), env) : ((iter((mcdr(ps))))))))); 
});;
    return ((iter((mcadr(env))))); 
});;

var env_reset_racket_exclamation_point = (function (key, value, env) {var iter = (function (ps) {
    return (((false !== ((is_empty(ps)))) ? (((false !== ((is_env_empty((env_parent_of(env)))))) ? ((user_error_cannot_reset_unset_variable(key))) : ((env_reset_racket_exclamation_point(key, value, (env_parent_of(env))))))) : (((false !== ((is_equal(key, (mcaar(ps)))))) ? ((set_mcdar_racket_exclamation_point(ps, value)), env) : ((iter((mcdr(ps))))))))); 
});;
    return ((iter((mcadr(env))))); 
});;

var env_merge = ((function () {var env_merge_2 = (function (e1, e2) {
    return (((false !== (((is_env_empty(e1)) && (is_env_empty(e2))))) ? (empty_env) : (((false !== ((is_env_empty(e1)))) ? (e2) : (((false !== ((is_env_empty(e2)))) ? (e1) : ((env_extend((mappend((env_pairs_of(e1)), (env_pairs_of(e2)))), (env_merge_2((env_parent_of(e1)), (env_parent_of(e2))))))))))))); 
});; 
    var env_merge = (function (first_env) { 
    var rest_env = Array.prototype.slice.call(arguments, 1); 
    
    return (((false !== ((is_empty(rest_env)))) ? (first_env) : ((env_merge_2(first_env, (apply(env_merge, rest_env))))))); 
});;
    return (env_merge); 
})());;

var env_all_pairs_of = (function (env) {
    return (((false !== ((is_env_empty(env)))) ? (empty) : ((mappend((env_pairs_of(env)), (env_all_pairs_of((env_parent_of(env))))))))); 
});;

var env_copy_youngest_scope = (function (env) {
    return ((env_extend((mcopy((env_pairs_of(env)))), (env_parent_of(env))))); 
});;

var is_token_number = (partial(is_tagged_list, (Symbol("Token-number"))));;

var is_token_string = (partial(is_tagged_list, (Symbol("Token-string"))));;

var is_token_boolean = (partial(is_tagged_list, (Symbol("Token-boolean"))));;

var is_token_nil = (partial(is_tagged_list, (Symbol("Token-nil"))));;

var is_token_dot = (partial(is_tagged_list, (Symbol("Token-dot"))));;

var is_token_unknown = (partial(is_tagged_list, (Symbol("Token-unknown"))));;

var is_token_identifier = (partial(is_tagged_list, (Symbol("Token-identifier"))));;

var is_token_parameter = (partial(is_tagged_list, (Symbol("Token-parameter"))));;

var is_token_funject_literal = (partial(is_tagged_list, (Symbol("Token-funject-literal"))));;

var is_token_list_literal = (partial(is_tagged_list, (Symbol("Token-list-literal"))));;

var is_token_sequence = (partial(is_tagged_list, (Symbol("Token-sequence"))));;

var is_token_strict_assignment = (partial(is_tagged_list, (Symbol("Token-strict-assignment"))));;

var is_token_lazy_assignment = (partial(is_tagged_list, (Symbol("Token-lazy-assignment"))));;

var is_token_funject_strict_assignment = (partial(is_tagged_list, (Symbol("Token-funject-strict-assignment"))));;

var is_token_funject_lazy_assignment = (partial(is_tagged_list, (Symbol("Token-funject-lazy-assignment"))));;

var is_token_reset_strict_assignment = (partial(is_tagged_list, (Symbol("Token-reset-strict-assignment"))));;

var is_token_reset_lazy_assignment = (partial(is_tagged_list, (Symbol("Token-reset-lazy-assignment"))));;

var is_token_invocation = (partial(is_tagged_list, (Symbol("Token-invocation"))));;

var is_token_funject_inheritance = (partial(is_tagged_list, (Symbol("Token-funject-inheritance"))));;

var is_token_inverse_definition = (partial(is_tagged_list, (Symbol("Token-inverse-definition"))));;

var is_token_any = (function (exp) {
    return (((is_token_number(exp)) || (is_token_string(exp)) || (is_token_boolean(exp)) || (is_token_nil(exp)) || (is_token_dot(exp)) || (is_token_unknown(exp)) || (is_token_identifier(exp)) || (is_token_parameter(exp)) || (is_token_funject_literal(exp)) || (is_token_list_literal(exp)) || (is_token_sequence(exp)) || (is_token_strict_assignment(exp)) || (is_token_lazy_assignment(exp)) || (is_token_funject_strict_assignment(exp)) || (is_token_funject_lazy_assignment(exp)) || (is_token_reset_strict_assignment(exp)) || (is_token_reset_lazy_assignment(exp)) || (is_token_invocation(exp)) || (is_token_funject_inheritance(exp)) || (is_token_inverse_definition(exp)))); 
});;

var token_contents = (function (tokens, f) {(assert((is_token_any(tokens))));
    return ((apply(f, (mlist_to_list((mcdr(tokens))))))); 
});;

var create_lang = (function () { 
    var args = Array.prototype.slice.call(arguments, 0); 
    
    return (((false !== ((is_eq((Symbol("Number")), (car(args)))))) ? ((assert((2 === (length(args))), "I tried to create a Number but was passed ", args)), (assert((is_number((cadr(args)))), "I tried to create a Number but was passed ", args))) : (((false !== ((is_eq((Symbol("String")), (car(args)))))) ? ((assert((2 === (length(args))), "I tried to create a String but was passed ", args)), (assert((is_string((cadr(args)))), "I tried to create a String but was passed ", args))) : (((false !== ((is_eq((Symbol("Boolean")), (car(args)))))) ? ((assert((2 === (length(args))), "I tried to create a Boolean but was passed ", args)), (assert((is_boolean((cadr(args)))), "I tried to create a Boolean but was passed ", args))) : (((false !== (((is_eq((Symbol("Nil")), (car(args)))) || (is_eq((Symbol("Dot")), (car(args)))) || (is_eq((Symbol("Unknown")), (car(args))))))) ? ((assert((1 === (length(args))), "I tried to create a Nil, Dot, or Unknown but was passed ", args))) : (((false !== ((is_eq((Symbol("List")), (car(args)))))) ? ((assert((2 === (length(args))), "I tried to create a List but was passed ", args)), (assert((is_mlist((cadr(args)))), "I tried to create a List but was passed ", args))) : (((false !== ((is_eq((Symbol("Funject")), (car(args)))))) ? ((assert((5 === (length(args))), "I tried to create a Funject but was passed ", args)), (assert((is_mlist((caddr(args)))), "I tried to create a Funject but was passed ", args))) : ((display_all("Warning: I fail to recognize the type of ", args, "!\n")))))))))))))), (apply(mlist, args))); 
});;

var is_lang = (function (sym, exp) {
    return ((is_eq(sym, (mcar(exp))))); 
});;

var is_lang_any = (function (exp) {
    return (((is_mlist(exp)) && (not((is_empty(exp)))) && ((is_eq((mcar(exp)), (Symbol("Number")))) || (is_eq((mcar(exp)), (Symbol("String")))) || (is_eq((mcar(exp)), (Symbol("Boolean")))) || (is_eq((mcar(exp)), (Symbol("Nil")))) || (is_eq((mcar(exp)), (Symbol("Dot")))) || (is_eq((mcar(exp)), (Symbol("Unknown")))) || (is_eq((mcar(exp)), (Symbol("List")))) || (is_eq((mcar(exp)), (Symbol("Funject"))))))); 
});;

var lang_contents = (function (exp, f) {(assert((is_lang_any(exp)), "I tried to take the lang-contents of a non-lang: ", exp));
    return ((apply(f, (mlist_to_list((mcdr(exp))))))); 
});;

var _eval_escaped_since_its_used_in_js = (function (exp, env) {
    return ((exp(env))); 
});;

var eval_each = (function (exps, env) {
    return ((mmap((function (exp) {
    return ((_eval_escaped_since_its_used_in_js(exp, env))); 
}), exps))); 
});;

var each_evaled = (function (exps, env, f) {
    return ((apply(f, (map((function (exp) {
    return ((_eval_escaped_since_its_used_in_js(exp, env))); 
}), exps))))); 
});;

var analyze = (function (tokens) {
    return (((false !== ((is_token_number(tokens)))) ? ((analyze_number(tokens))) : (((false !== ((is_token_string(tokens)))) ? ((analyze_string(tokens))) : (((false !== ((is_token_boolean(tokens)))) ? ((analyze_boolean(tokens))) : (((false !== ((is_token_nil(tokens)))) ? ((analyze_nil(tokens))) : (((false !== ((is_token_dot(tokens)))) ? ((analyze_dot(tokens))) : (((false !== ((is_token_unknown(tokens)))) ? ((analyze_unknown(tokens))) : (((false !== ((is_token_identifier(tokens)))) ? ((analyze_identifier(tokens))) : (((false !== ((is_token_parameter(tokens)))) ? ((analyze_parameter(tokens))) : (((false !== ((is_token_funject_literal(tokens)))) ? ((analyze_funject_literal(tokens))) : (((false !== ((is_token_list_literal(tokens)))) ? ((analyze_list_literal(tokens))) : (((false !== ((is_token_sequence(tokens)))) ? ((analyze_sequence(tokens))) : (((false !== ((is_token_strict_assignment(tokens)))) ? ((analyze_strict_assignment(tokens))) : (((false !== ((is_token_lazy_assignment(tokens)))) ? ((analyze_lazy_assignment(tokens))) : (((false !== ((is_token_funject_strict_assignment(tokens)))) ? ((analyze_funject_strict_assignment(tokens))) : (((false !== ((is_token_funject_lazy_assignment(tokens)))) ? ((analyze_funject_lazy_assignment(tokens))) : (((false !== ((is_token_reset_strict_assignment(tokens)))) ? ((analyze_reset_strict_assignment(tokens))) : (((false !== ((is_token_reset_lazy_assignment(tokens)))) ? ((analyze_reset_lazy_assignment(tokens))) : (((false !== ((is_token_invocation(tokens)))) ? ((analyze_invocation(tokens))) : (((false !== ((is_token_funject_inheritance(tokens)))) ? ((analyze_funject_inheritance(tokens))) : (((false !== ((is_token_inverse_definition(tokens)))) ? ((analyze_inverse_definition(tokens))) : ((error("analyze: I fail to recognize the token ", tokens))))))))))))))))))))))))))))))))))))))))))); 
});;

var each_analyzed = (function (tokenses, f) {
    return ((apply(f, (map(analyze, tokenses))))); 
});;

var analyze_number = (function (tokens) {
    return ((function (env) {
    return ((create_lang((Symbol("Number")), (mcadr(tokens))))); 
})); 
});;

var analyze_string = (function (tokens) {
    return ((function (env) {
    return ((create_lang((Symbol("String")), (mcadr(tokens))))); 
})); 
});;

var analyze_boolean = (function (tokens) {
    return ((function (env) {
    return ((create_lang((Symbol("Boolean")), (mcadr(tokens))))); 
})); 
});;

var analyze_nil = (function (tokens) {
    return ((function (env) {
    return ((create_lang((Symbol("Nil"))))); 
})); 
});;

var analyze_dot = (function (tokens) {
    return ((function (env) {
    return ((create_lang((Symbol("Dot"))))); 
})); 
});;

var analyze_unknown = (function (tokens) {
    return ((function (env) {
    return ((create_lang((Symbol("Unknown"))))); 
})); 
});;

var analyze_identifier = (function (tokens) {
    return (((function (name) {
    return ((function (env) {
    return ((lookup_identifier(name, env))); 
})); 
})((mcadr(tokens))))); 
});;

var analyze_parameter = analyze_identifier;;

var analyze_funject_literal = ((function () {var analyze_pairs = (function (ps) {
    return ((mmap((function (p) {(set_mcadr_racket_exclamation_point(p, (analyze_sequence((mcadr(p))))));
    return (p); 
}), ps))); 
});; 
    var bind_pairs = (function (ps, env) {
    return ((mmap((function (p) {
    return ((bind_funject_pair(p, env))); 
}), ps))); 
});; 
    var analyze_funject_literal = (function (tokens) {
    return (((function (apairs) {
    return ((function (env) {
    return (((function (bpairs) {
    return ((create_lang((Symbol("Funject")), (random(100000000)), bpairs, primitive_funject_god, primitive_funject_inverse_god))); 
})((bind_pairs(apairs, env))))); 
})); 
})((analyze_pairs((mcadr(tokens))))))); 
});;
    return (analyze_funject_literal); 
})());;

var analyze_list_literal = (function (tokens) {
    return (((function (aelems) {
    return ((function (env) {
    return ((create_lang((Symbol("List")), (eval_each(aelems, env))))); 
})); 
})((mmap(analyze, (mcadr(tokens))))))); 
});;

var analyze_sequence = (function (tokens) {
    return ((mlist((Symbol("Analyzed-sequence")), (mmap(analyze, (mcadr(tokens))))))); 
});;

var analyze_strict_assignment = (function (tokens) {
    return (((function (left_name, aright) {
    return ((function (env) {
    return (((function (eright) {(assign_strict_identifier_racket_exclamation_point(left_name, eright, env));
    return (eright); 
})((_eval_escaped_since_its_used_in_js(aright, env))))); 
})); 
})((mcadr((mcadr(tokens)))), (analyze((mcaddr(tokens))))))); 
});;

var analyze_lazy_assignment = (function (tokens) {
    return (((function (left_name, aright) {
    return ((function (env) {(assign_lazy_identifier_racket_exclamation_point(left_name, aright, env));
    return (lang_nil); 
})); 
})((mcadr((mcadr(tokens)))), (analyze((mcaddr(tokens))))))); 
});;

var analyze_funject_strict_assignment = (function (tokens) {
    return ((token_contents(tokens, (function (invocation, right) {
    return ((token_contents(invocation, (function (receiver, pattern) {
    return ((each_analyzed((list(receiver, right)), (function (areceiver, aright) {
    return ((function (env) {
    return ((each_evaled((list(areceiver, aright)), env, (function (ereceiver, eright) {(push_funject_pair_racket_exclamation_point(ereceiver, (bind_funject_pair((create_funject_pair(pattern, eright)), global_env))));
    return (eright); 
})))); 
})); 
})))); 
})))); 
})))); 
});;

var analyze_funject_lazy_assignment = (function (tokens) {
    return ((token_contents(tokens, (function (invocation, right) {
    return ((token_contents(invocation, (function (receiver, pattern) {
    return ((each_analyzed((list(receiver, right)), (function (areceiver, aright) {
    return ((function (env) {
    return ((each_evaled((list(areceiver)), env, (function (ereceiver) {(push_funject_pair_racket_exclamation_point(ereceiver, (bind_funject_pair((create_funject_pair(pattern, aright)), env))));
    return (lang_nil); 
})))); 
})); 
})))); 
})))); 
})))); 
});;

var analyze_reset_strict_assignment = (function (tokens) {
    return ((token_contents(tokens, (function (left, right) {
    return (((function (left_name, aright) {
    return ((function (env) {
    return (((false !== ((not((is_equal(env, global_env)))))) ? (((function (eright) {(reset_strict_identifier_racket_exclamation_point(left_name, eright, env));
    return (eright); 
})((_eval_escaped_since_its_used_in_js(aright, env))))) : ((user_error("analyze-reset-strict-assignment", "I cannot reset the variable \"", left_name, "\" in the global scope!"))))); 
})); 
})((mcadr(left)), (analyze(right))))); 
})))); 
});;

var analyze_reset_lazy_assignment = (function (tokens) {
    return ((token_contents(tokens, (function (left, right) {
    return (((function (left_name, aright) {
    return ((function (env) {
    return (((false !== ((not((is_equal(env, global_env)))))) ? ((reset_lazy_identifier_racket_exclamation_point(left_name, aright, env))) : ((user_error("analyze-reset-lazy-assignment", "I cannot reset the variable \"", left_name, "\" in the global scope!"))))); 
})); 
})((mcadr(left)), (analyze(right))))); 
})))); 
});;

var analyze_invocation = (function (tokens) {
    return ((token_contents(tokens, (function (receiver, arg) {
    return (((function (areceiver, aarg) {
    return ((function (env) {
    return (((function (ereceiver, earg) {
    return ((invoke(ereceiver, earg))); 
})((_eval_escaped_since_its_used_in_js(areceiver, env)), (_eval_escaped_since_its_used_in_js(aarg, env))))); 
})); 
})((analyze(receiver)), (analyze(arg))))); 
})))); 
});;

var analyze_funject_inheritance = (function (tokens) {
    return ((token_contents(tokens, (function (heir, inherited) {
    return ((each_analyzed((list(heir, inherited)), (function (aheir, ainherited) {
    return ((function (env) {
    return (((function (eheir, einherited) {(set_funject_parent_racket_exclamation_point(eheir, einherited));
    return (eheir); 
})((_eval_escaped_since_its_used_in_js(aheir, env)), (_eval_escaped_since_its_used_in_js(ainherited, env))))); 
})); 
})))); 
})))); 
});;

var analyze_inverse_definition = (function (tokens) {
    return ((token_contents(tokens, (function (left, right) {
    return ((each_analyzed((list(left, right)), (function (aleft, aright) {
    return ((function (env) {
    return (((function (eleft, eright) {(set_funject_inverse_racket_exclamation_point(eleft, eright));
    return (eleft); 
})((_eval_escaped_since_its_used_in_js(aleft, env)), (_eval_escaped_since_its_used_in_js(aright, env))))); 
})); 
})))); 
})))); 
});;

var invoke = (function (receiver, arg) { 
    var maybe_own = Array.prototype.slice.call(arguments, 2); 
    var own = ((false !== ((is_empty(maybe_own)))) ? (receiver) : ((car(maybe_own))));;
    return (((false !== ((is_primitive(receiver)))) ? ((invoke_primitive(receiver, arg, own))) : (((false !== ((is_lang((Symbol("Number")), receiver)))) ? ((invoke_number(receiver, arg, own))) : (((false !== ((is_lang((Symbol("Funject")), receiver)))) ? ((invoke_funject(receiver, arg, own))) : ((error("invoke: I know not how to invoke ", receiver, "!"))))))))); 
});;

var invoke_primitive = (function (receiver, arg, own) {
    return ((primitive_contents(receiver, (function (funject, _) {
    return ((funject(arg, own))); 
})))); 
});;

var invoke_number = (function (receiver, arg, own) {
    return ((unless((is_lang((Symbol("String")), arg)), (invoke(primitive_funject_god, arg, own)), (lang_contents(arg, (function (str) {
    return (((false !== ((is_equal(str, "+")))) ? ((create_primitive_number_plus((mcadr(receiver))))) : (((false !== ((is_equal(str, "-")))) ? ((create_primitive_number_minus((mcadr(receiver))))) : (((false !== ((is_equal(str, "*")))) ? ((create_primitive_number_times((mcadr(receiver))))) : (((false !== ((is_equal(str, "/")))) ? ((create_primitive_number_div((mcadr(receiver))))) : ((invoke(primitive_funject_god, arg, own))))))))))); 
})))))); 
});;

var invoke_funject = (function (receiver, arg, own) {
    return (((function (apairs, parent, inverse) {var iter = (function (apairs) {
    return (((false !== ((is_empty(apairs)))) ? (((false !== (parent)) ? ((invoke(parent, arg, receiver))) : ((user_error_no_matching_pattern(receiver, arg))))) : (((function (pair) {
    return (((function (pattern) {
    return (((function (consequent) {
    return (((function (env) {
    return (((function (bindings) {
    return (((false !== (bindings)) ? (((false !== ((is_lang((Symbol("Analyzed-sequence")), consequent)))) ? ((force_sequence((bind_sequence(consequent, (env_extend((env_pairs((create_env_pair("own", (bind_as_though_sequence(own)))))), bindings))))))) : (consequent))) : ((iter((mcdr(apairs))))))); 
})((choice_bindings_from_matching(pattern, arg, env))))); 
})((mcaddr(pair))))); 
})((mcadr(pair))))); 
})((mcar(pair))))); 
})((mcar(apairs))))))); 
});;
    return ((iter(apairs))); 
})((funject_pairs_of(receiver)), (funject_parent_of(receiver)), (funject_inverse_of(receiver))))); 
});;

var list_id_of = (function (l) {
    return ((unless((is_lang((Symbol("List")), l)), (error("I cannot find the id of a non-list: ", l, "!")), (mcadr(l))))); 
});;

var set_list_id_racket_exclamation_point = (function (l, val) {
    return ((unless((is_lang((Symbol("List")), l)), (error("I cannot set the id of a non-list: ", l, "!")), (set_mcadr_racket_exclamation_point(l, val))))); 
});;

var list_elems_of = (function (l) {
    return ((unless((is_lang((Symbol("List")), l)), (error("I cannot find the elements of a non-list: ", l, "!")), (mcaddr(l))))); 
});;

var set_list_elems_racket_exclamation_point = (function (l, val) {
    return ((unless((is_lang((Symbol("List")), l)), (error("I !cannot set the elements of a non-list: ", l, "!")), (set_mcaddr_racket_exclamation_point(l, val))))); 
});;

var funject_id_of = (function (funject) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (error("I cannot find the pairs of a non-funject: ", funject, "!")), (mcadr(funject))))); 
});;

var set_funject_id_racket_exclamation_point = (function (funject, id) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (error("I cannot set the pairs of a non-funject: ", funject, "!")), (set_mcadr_racket_exclamation_point(funject, id))))); 
});;

var funject_pairs_of = (function (funject) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (error("I cannot find the pairs of a non-funject: ", funject, "!")), (mcaddr(funject))))); 
});;

var set_funject_pairs_racket_exclamation_point = (function (funject, pairs) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (error("I cannot set the pairs of a non-funject: ", funject, "!")), (set_mcaddr_racket_exclamation_point(funject, pairs))))); 
});;

var push_funject_pair_racket_exclamation_point = (function (funject, p) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (user_error_cannot_push_pair_to_non_funject()), (set_mcaddr_racket_exclamation_point(funject, (mcons(p, (mcaddr(funject))))))))); 
});;

var funject_parent_of = (function (funject) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (error("I cannot find the parent of a non-funject: ", funject, "!")), (mcadddr(funject))))); 
});;

var set_funject_parent_racket_exclamation_point = (function (funject, parent) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (user_error_cannot_set_parent_of_non_funject()), (set_mcadddr_racket_exclamation_point(funject, parent))))); 
});;

var funject_inverse_of = (function (funject) {
    return (((false !== ((is_lang((Symbol("Funject")), funject)))) ? ((mcaddddr(funject))) : (((false !== ((is_primitive(funject)))) ? ((primitive_contents(funject, (function (itself, inverse) {
    return ((create_primitive(inverse, itself))); 
})))) : ((error("I cannot find the inverse of a non-funject or primitive: ", funject, "!"))))))); 
});;

var set_funject_inverse_racket_exclamation_point = (function (funject, inverse) {
    return ((unless((is_lang((Symbol("Funject")), funject)), (user_error_set_inverse_of_non_funject()), (set_mcaddddr_racket_exclamation_point(funject, inverse))))); 
});;

var create_funject_pair = mlist;;

var create_funject_bound_pair = mlist;;

var lookup_identifier = (function (name, env) {
    return (((env_get(name, env))())); 
});;

var assign_strict_identifier_racket_exclamation_point = (function (name, right, env) {
    return ((env_set_racket_exclamation_point(name, (bind_as_though_sequence(right)), env))); 
});;

var assign_lazy_identifier_racket_exclamation_point = (function (name, right, env) {
    return ((env_set_racket_exclamation_point(name, (bind_sequence(right, env)), env))); 
});;

var reset_strict_identifier_racket_exclamation_point = (function (name, right, env) {
    return ((env_reset_racket_exclamation_point(name, (bind_as_though_sequence(right)), (env_parent_of(env))))); 
});;

var reset_lazy_identifier_racket_exclamation_point = (function (name, right, env) {
    return ((env_reset_racket_exclamation_point(name, (bind_sequence(right, env)), (env_parent_of(env))))); 
});;

var bind_sequence = (function (exp, env) {
    return (((function (statements) {
    return ((function () {
    return ((mlast((eval_each(statements, env))))); 
})); 
})((mcadr(exp))))); 
});;

var bind_funject_pair = (function (p, env) {
    return ((mlist_contents(p, (function (pattern, consequent) {
    return ((create_funject_bound_pair(pattern, consequent, env))); 
})))); 
});;

var force_sequence = (function (stmts) {
    return ((stmts())); 
});;

var bind_as_though_sequence = (function (exp) {
    return ((function () {
    return (exp); 
})); 
});;

var choice_bindings_from_matching = ((function () {var possibility = list;; 
    var is_possible = (compose(not, is_empty));; 
    var impossibility = list;; 
    var is_impossible = is_empty;; 
    var possibility_first = car;; 
    var given = (function (possibilities, iterator) {
    return ((flatten((map(iterator, possibilities))))); 
});; 
    var also = append;; 
    var lang_list_to_possibilities = (compose(mlist_to_list, mcadr));; 
    var find_unknown_parameters = ((function () {var find_unknown_parameters = (function (pattern, bindings, env, found) {
    return (((false !== ((is_token_parameter(pattern)))) ? (((false !== (((is_env_has((mcadr(pattern)), bindings)) || (mmember((mcadr(pattern)), found))))) ? (found) : ((mcons((mcadr(pattern)), found))))) : (((false !== ((is_token_invocation(pattern)))) ? ((find_unknown_parameters((mcadr(pattern)), bindings, env, (find_unknown_parameters((mcaddr(pattern)), bindings, env, found))))) : (((false !== ((is_token_list_literal(pattern)))) ? ((mfoldl((function (e, found) {
    return ((find_unknown_parameters(e, bindings, env, found))); 
}), found, (mcadr(pattern))))) : (((false !== (((is_token_number(pattern)) || (is_token_string(pattern)) || (is_token_boolean(pattern)) || (is_token_nil(pattern)) || (is_token_dot(pattern)) || (is_token_unknown(pattern)) || (not((is_token_any(pattern)))) || (is_token_identifier(pattern))))) ? (found) : (((false !== (((is_token_strict_assignment(pattern)) || (is_token_lazy_assignment(pattern)) || (is_token_funject_strict_assignment(pattern)) || (is_token_funject_lazy_assignment(pattern)) || (is_token_inverse_definition(pattern)) || (is_token_funject_inheritance(pattern)) || (is_token_funject_literal(pattern))))) ? ((user_error_funject_pattern_cannot_contain(pattern))) : ((error("find-unknown-parameters: I fail to account for the type of ", pattern, "!"))))))))))))); 
});;
    return ((function (pattern, bindings, env) {
    return ((find_unknown_parameters(pattern, bindings, env, ([])))); 
})); 
})());; 
    var bindings_from_matching_once = (function (pattern, arg, bindings, env) {
    return (((false !== (((is_token_number(pattern)) || (is_token_string(pattern)) || (is_token_boolean(pattern)) || (is_token_nil(pattern)) || (is_token_dot(pattern)) || (is_token_unknown(pattern))))) ? ((bindings_from_matching_flat(pattern, arg, bindings, env))) : (((false !== ((not((is_token_any(pattern)))))) ? (((false !== ((is_lang_equal(pattern, arg)))) ? ((possibility(bindings))) : ((impossibility())))) : (((false !== (((is_token_strict_assignment(pattern)) || (is_token_lazy_assignment(pattern)) || (is_token_funject_strict_assignment(pattern)) || (is_token_funject_lazy_assignment(pattern)) || (is_token_inverse_definition(pattern)) || (is_token_funject_inheritance(pattern)) || (is_token_funject_literal(pattern))))) ? ((user_error_funject_pattern_cannot_contain(pattern))) : (((false !== ((is_token_list_literal(pattern)))) ? ((bindings_from_matching_list_literal(pattern, arg, bindings, env))) : (((false !== ((is_token_parameter(pattern)))) ? ((bindings_from_matching_parameter(pattern, arg, bindings, env))) : (((false !== ((is_token_identifier(pattern)))) ? ((bindings_from_matching_identifier(pattern, arg, bindings, env))) : (((false !== ((is_token_invocation(pattern)))) ? ((bindings_from_matching_invocation(pattern, arg, bindings, env))) : ((error("bindings-from-matching: I fail to account for the type of ", pattern, "!"))))))))))))))))); 
});; 
    var bindings_from_matching_flat = (function (pattern, arg, bindings, env) {
    return (((false !== ((is_lang_equal(arg, (_eval_escaped_since_its_used_in_js((analyze(pattern)), env)))))) ? ((possibility(bindings))) : ((impossibility())))); 
});; 
    var bindings_from_matching_list_literal = ((function () {var iter = (function (elems, arg_elems, bindings, env) {
    return (((false !== ((is_empty(elems)))) ? (((false !== ((is_empty(arg_elems)))) ? ((possibility(bindings))) : ((impossibility())))) : ((given((bindings_from_matching_once((mcar(elems)), (mcar(arg_elems)), bindings, env)), (function (bindings) {
    return ((iter((mcdr(elems)), (mcdr(arg_elems)), bindings, env))); 
})))))); 
});; 
    var bindings_from_matching_list_literal = (function (pattern, arg, bindings, env) {
    return (((false !== ((not((is_lang((Symbol("List")), arg)))))) ? ((impossibility())) : ((token_contents(pattern, (function (elems) {
    return ((lang_contents(arg, (function (arg_elems) {
    return ((iter(elems, arg_elems, bindings, env))); 
})))); 
})))))); 
});;
    return (bindings_from_matching_list_literal); 
})());; 
    var bindings_from_matching_parameter = (function (pattern, arg, bindings, env) {
    return ((token_contents(pattern, (function (name) {
    return (((false !== ((not((is_env_has(name, bindings)))))) ? (((function (new_bindings) {(assign_strict_identifier_racket_exclamation_point(name, arg, new_bindings));
    return ((possibility(new_bindings))); 
})((env_copy_youngest_scope(bindings))))) : (((false !== ((is_lang_equal(arg, (lookup_identifier(name, bindings)))))) ? ((possibility(bindings))) : ((impossibility())))))); 
})))); 
});; 
    var bindings_from_matching_identifier = (function (pattern, arg, bindings, env) {
    return (((false !== ((is_lang_equal((_eval_escaped_since_its_used_in_js((analyze(pattern)), env)), arg)))) ? ((possibility(bindings))) : ((impossibility())))); 
});; 
    var bindings_from_matching_invocation = (function (pattern, arg, bindings, env) {
    return (((false !== ((1 < (mlength((find_unknown_parameters(pattern, bindings, env))))))) ? ((possibility(bindings))) : ((token_contents(pattern, (function (receiver, pattern_arg) {
    return (((function (ereceiver) {
    return (((function (unknowns_epattern_arg) {
    return (((function (unknowns) {
    return (((function (epattern_arg) {
    return (((function (inverse) {
    return (((function (possibilities) {
    return (((false !== ((not((1 === (length(unknowns))))))) ? ((possibility(bindings))) : (((function (to_match) {
    return ((given(possibilities, (function (value) {
    return (((function (new_bindings) {(assign_strict_identifier_racket_exclamation_point(to_match, value, new_bindings));
    return (new_bindings); 
})((env_copy_youngest_scope(bindings))))); 
})))); 
})((car(unknowns))))))); 
})((lang_list_to_possibilities(inverse))))); 
})((invoke((funject_inverse_of(ereceiver)), (create_lang((Symbol("List")), (mlist(arg, epattern_arg))))))))); 
})((cadr(unknowns_epattern_arg))))); 
})((car(unknowns_epattern_arg))))); 
})((eval_pattern_arg(pattern_arg, bindings, env))))); 
})((_eval_escaped_since_its_used_in_js((analyze(receiver)), env))))); 
})))))); 
});; 
    var eval_pattern_arg = ((function () {var eval_pattern_arg = (function (pattern_arg, bindings, env) {
    return (((false !== ((is_token_number(pattern_arg)))) ? ((list(empty, (create_lang((Symbol("Number")), (mcadr(pattern_arg))))))) : (((false !== ((is_token_string(pattern_arg)))) ? ((list(empty, (create_lang((Symbol("String")), (mcadr(pattern_arg))))))) : (((false !== ((is_token_boolean(pattern_arg)))) ? ((list(empty, (create_lang((Symbol("Boolean")), (mcadr(pattern_arg))))))) : (((false !== ((is_token_nil(pattern_arg)))) ? ((list(empty, (create_lang((Symbol("Nil"))))))) : (((false !== ((is_token_dot(pattern_arg)))) ? ((list(empty, (create_lang((Symbol("Dot"))))))) : (((false !== ((is_token_unknown(pattern_arg)))) ? ((list(empty, (create_lang((Symbol("Unknown"))))))) : (((false !== ((is_token_parameter(pattern_arg)))) ? (((false !== ((is_env_has((mcadr(pattern_arg)), bindings)))) ? ((list(empty, (lookup_identifier((mcadr(pattern_arg)), bindings))))) : ((list((list((mcadr(pattern_arg)))), lang_unknown))))) : (((false !== ((is_token_identifier(pattern_arg)))) ? ((list(empty, (lookup_identifier((mcadr(pattern_arg)), env))))) : (((false !== ((is_token_list_literal(pattern_arg)))) ? ((eval_pattern_arg_list_literal(pattern_arg, bindings, env))) : ((error("eval-pattern-arg: I fail to recognize the token ", (deep_stream_to_list(pattern_arg))))))))))))))))))))))); 
});; 
    var eval_pattern_arg_list_literal = (function (pattern_arg, bindings, env) {var iter = (function (elems) {
    return (((false !== ((is_empty(elems)))) ? ((list(empty, empty))) : (((function (first_unknowns__first_evaled) {
    return (((function (first_unknowns) {
    return (((function (first_evaled) {
    return (((function (rest_unknowns__rest_evaled) {
    return (((function (rest_unknowns) {
    return (((function (rest_evaled) {
    return ((list((append(first_unknowns, rest_unknowns)), (mcons(first_evaled, rest_evaled))))); 
})((cadr(rest_unknowns__rest_evaled))))); 
})((car(rest_unknowns__rest_evaled))))); 
})((iter((mcdr(elems))))))); 
})((cadr(first_unknowns__first_evaled))))); 
})((car(first_unknowns__first_evaled))))); 
})((eval_pattern_arg((mcar(elems)), bindings, env))))))); 
});;
    return (((function (unknowns__elems_evaled) {
    return (((function (unknowns) {
    return (((function (elems_evaled) {
    return ((list(unknowns, (create_lang((Symbol("List")), elems_evaled))))); 
})((cadr(unknowns__elems_evaled))))); 
})((car(unknowns__elems_evaled))))); 
})((iter((mcadr(pattern_arg))))))); 
});;
    return (eval_pattern_arg); 
})());; 
    var bindings_from_matching = (function (pattern, arg, bindings, env) {var n = (mlength((find_unknown_parameters(pattern, bindings, env))));; 
    var iter = (function (last_found, bindings) {
    return ((given((bindings_from_matching_once(pattern, arg, bindings, env)), (function (bindings) {
    return (((function (now_found) {
    return (((false !== ((n === now_found))) ? ((possibility(bindings))) : (((false !== ((last_found === now_found))) ? ((impossibility())) : ((iter(now_found, bindings))))))); 
})((env_pair_count((env_pairs_of(bindings))))))); 
})))); 
});;
    return ((iter(0, bindings))); 
});; 
    var choice_bindings_from_matching = (function (pattern, arg, env) {
    return (((function (possibilities) {
    return (((false !== ((is_impossible(possibilities)))) ? (false) : ((env_extend((env_all_pairs_of((possibility_first(possibilities)))), env))))); 
})((bindings_from_matching(pattern, arg, (env_create((env_pairs()))), env))))); 
});;
    return (choice_bindings_from_matching); 
})());;

var lang_nil = (create_lang((Symbol("Nil"))));;

var lang_dot = (create_lang((Symbol("Dot"))));;

var lang_unknown = (create_lang((Symbol("Unknown"))));;

var is_lang_equal = is_equal;;

var create_primitive = (function (funject, inverse) {
    return ((mlist((Symbol("Primitive")), funject, inverse))); 
});;

var is_primitive = (function (exp) {
    return (((is_mlist(exp)) && (not((is_empty(exp)))) && (is_eq((Symbol("Primitive")), (mcar(exp)))))); 
});;

var primitive_contents = (function (prim, f) {(assert((is_primitive(prim))));
    return ((apply(f, (mlist_to_list((mcdr(prim))))))); 
});;

var create_primitive_infix_operator = (function (is_right_type, is_result_type, op, op_inv) {var self = (function (left) {
    return ((create_primitive((function (other, own) {
    return ((unless((is_right_type(other)), (invoke(primitive_funject_god, other)), (op(left, other))))); 
}), (function (result__arg, own) {
    return ((lang_contents(result__arg, (function (elems) {
    return ((mlist_contents(elems, (function (result, arg) {
    return ((unless(((is_result_type(result)) && (is_lang((Symbol("Unknown")), arg))), (invoke(primitive_funject_inverse_god, result__arg, self)), (op_inv(result, left))))); 
})))); 
})))); 
})))); 
});;
    return (self); 
});;

var create_primitive_unoverloaded_infix_operator = (function (right_type, result_type, op, op_inv) {
    return ((create_primitive_infix_operator((partial(is_lang, right_type)), (partial(is_lang, result_type)), (function (left, right) {
    return ((lang_contents(right, (function (right_contents) {
    return ((create_lang(result_type, (op(left, right_contents))))); 
})))); 
}), (function (result, left) {
    return ((lang_contents(result, (function (result_contents) {
    return ((create_lang((Symbol("List")), (mlist((create_lang(right_type, (op_inv(result_contents, left))))))))); 
})))); 
})))); 
});;

var create_primitive_funject_is = (create_primitive_infix_operator(is_lang_any, is_lang_any, (function (a, b) {
    return ((create_lang((Symbol("Boolean")), (is_lang_equal(a, b))))); 
}), (function (result, left) {
    return (((false !== ((is_equal(result, (mlist((Symbol("Boolean")), true)))))) ? ((create_lang((Symbol("List")), left))) : ((user_error_no_matching_pattern((list("is of ", left)), (create_lang((Symbol("List")), result, (create_lang((Symbol("Unknown"))))))))))); 
})));;

var create_primitive_number_plus = (create_primitive_unoverloaded_infix_operator((Symbol("Number")), (Symbol("Number")), _racket_plus_symbol, _));;

var create_primitive_number_minus = (create_primitive_unoverloaded_infix_operator((Symbol("Number")), (Symbol("Number")), _, _racket_plus_symbol));;

var create_primitive_number_times = (create_primitive_unoverloaded_infix_operator((Symbol("Number")), (Symbol("Number")), _racket_mult_symbol, _racket_division_symbol));;

var create_primitive_number_div = (create_primitive_unoverloaded_infix_operator((Symbol("Number")), (Symbol("Number")), _racket_division_symbol, _racket_mult_symbol));;

var primitive_funject_god = (create_primitive((function (arg, own) {
    return (((false !== ((is_lang((Symbol("String")), arg)))) ? ((lang_contents(arg, (function (str) {
    return (((false !== ((is_equal(str, "is")))) ? ((create_primitive_funject_is(own))) : ((user_error_no_matching_pattern(own, arg))))); 
})))) : ((user_error_no_matching_pattern("The primitive funject god inversted", arg))))); 
}), (function (arg, own) {
    return ((user_error_no_matching_pattern("The primitive funject god inversted", arg))); 
})));;

var primitive_funject_inverse_god = (create_primitive((mcaddr(primitive_funject_god)), (mcadr(primitive_funject_god))));;

var global_env = (env_create((env_pairs((create_env_pair("Yin", primitive_funject_god)), (create_env_pair("Yang", primitive_funject_inverse_god)), (create_env_pair_strict("+", (create_lang((Symbol("String")), "+")))), (create_env_pair_strict("-", (create_lang((Symbol("String")), "-")))), (create_env_pair_strict("*", (create_lang((Symbol("String")), "*")))), (create_env_pair_strict("/", (create_lang((Symbol("String")), "/")))), (create_env_pair_strict("is", (create_lang((Symbol("String")), "is"))))))));;

var user_error = (function () { 
    var args = Array.prototype.slice.call(arguments, 0); 
    
    return ((apply(error, (cons("User Error: ", args))))); 
});;

var user_error_cannot_find_variable = (function (_var_escaped_due_to_significance_in_js) {
    return ((user_error("I cannot find the variable ", _var_escaped_due_to_significance_in_js, "!"))); 
});;

var user_error_no_matching_pattern = (function (receiver, arg) {
    return ((user_error("I find no pattern matching ", arg, " in ", receiver))); 
});;

var user_error_cannot_reset_unset_variable = (function (_var_escaped_due_to_significance_in_js) {
    return ((user_error("You tried to reset the variable ", _var_escaped_due_to_significance_in_js, ", but you haven't even assigned it yet!"))); 
});;

var user_error_cannot_push_pair_to_non_funject = (function () {
    return ((user_error("I cannot alter the patterns of a non-funject!"))); 
});;

var user_error_cannot_set_parent_of_non_funject = (function () {
    return ((user_error("I cannot set the parent of a non-funject!"))); 
});;

var user_error_set_inverse_of_non_funject = (function () {
    return ((user_error("I cannot set the inverse of a non-funject!"))); 
});;

var user_error_funject_pattern_cannot_contain = (function (pattern) {
    return ((user_error("A funject pattern cannot contain a funject of the type of ", pattern))); 
});;

var user_error_multiple_unknowns_in_pattern_arg = (function () {
    return ((user_error("A funject pattern cannot contain multiple unknown matching variables!"))); 
});;

var p1 = (compose(car, stream_first, parse));;

var interpret = (function (str) {
    return ((mmap((function (exp) {
    return ((_eval_escaped_since_its_used_in_js(exp, global_env))); 
}), (mmap(analyze, (deep_list_to_mlist((p1(str))))))))); 
});

console.log(interpret('4 + '));
